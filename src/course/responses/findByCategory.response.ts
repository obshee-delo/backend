import { DeepPartial } from "typeorm";
import { Course } from "../course.entity";


export interface FindByCategoryResponse {
    courses: DeepPartial<Course>[]
}
