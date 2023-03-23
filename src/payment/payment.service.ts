import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CourseService } from "src/course/course.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm/repository/Repository";
import { PaymentNew } from "./interfaces";
import { Payment } from "./payment.entity";


@Injectable()
export class PaymentService extends TypeOrmCrudService<Payment> {
    constructor(
        @InjectRepository(Payment) private repository: Repository<Payment>,
        private userService: UserService,
        private courseService: CourseService
    ) {
        super(repository);
    }

    /**
     * Full payment processing.
     */
    public async new(payment: PaymentNew): Promise<Payment> {
        let course = await this.courseService.repository.findOneBy({ name: payment.courseName });
        if (!course) throw new HttpException('Unknown course.', HttpStatus.NOT_FOUND);

        let user = await this.userService.repository.findOneBy({ id: payment.userId });
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

        if (user.avalaibleCourses.includes(course.id) ||
            user.finishedCourses.includes(course.id))
            throw new HttpException('User already have this course.', HttpStatus.BAD_REQUEST);

        user.avalaibleCourses.push(course.id);
        await this.userService.repository.save(user);

        let paymentEntity = Object.assign(await this.repository.create(), payment);
        await this.repository.save(paymentEntity);

        return paymentEntity;
    }
}
