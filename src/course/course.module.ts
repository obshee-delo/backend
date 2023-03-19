import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseController } from "./course.controller";
import { Course } from "./course.entity";
import { CourseService } from "./course.service";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ Course ])
    ],
    controllers: [
        CourseController
    ],
    providers: [
        CourseService
    ],
    exports: [
        CourseService
    ]
})
export class CourseModule {}
