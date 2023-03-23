import { DeepPartial } from "typeorm";
import { Course } from "../course.entity";


export type CourseFindByCategoryResponse = {
    courses: Course[]
}
