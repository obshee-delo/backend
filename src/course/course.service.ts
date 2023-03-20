import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Course } from "./course.entity";
import { FindByCategory } from "./interfaces";


export class CourseService extends TypeOrmCrudService<Course> {
    constructor(
        @InjectRepository(Course) public repository: Repository<Course>
    ) {
        super(repository);
    }

    public async findByCategory({ category }: FindByCategory) {
        return this.repository.find({ where: { category } });
    }
}
