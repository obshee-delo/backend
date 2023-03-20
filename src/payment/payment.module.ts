import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseModule } from "src/course/course.module";
import { UserModule } from "src/user/user.module";
import { PaymentController } from "./payment.controller";
import { Payment } from "./payment.entity";
import { PaymentService } from "./payment.service";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ Payment ]),
        UserModule,
        CourseModule
    ],
    controllers: [
        PaymentController
    ],
    providers: [
        PaymentService
    ],
    exports: [
        PaymentService
    ]
})
export class PaymentModule {}
