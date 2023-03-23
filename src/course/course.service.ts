import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Course } from "./course.entity";
import { CourseFindByCategory } from './interfaces/index';


export class CourseService extends TypeOrmCrudService<Course> {
    constructor(
        @InjectRepository(Course) public repository: Repository<Course>
    ) {
        super(repository);
    }

    public async findByCategory({ category }: CourseFindByCategory): Promise<Course[]> {
        return this.repository.find({ where: { category } });
    }
}
