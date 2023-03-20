import { ApiAdapter } from '../adapter';
import { CrudService } from '../service';
import { Response } from '../types';


export type Course = {
    id: string,
    name: string,
    category: string
}

export type CourseFindByCategoryRequest = {
    category: string
};

export type CourseFindByCategoryResponse = Response<Course[]>;


export class CourseService extends CrudService<Course> {
    constructor(adapter: ApiAdapter) {
        super(adapter, 'course');
    }

    public findByCategory(parameters: CourseFindByCategoryRequest): Promise<CourseFindByCategoryResponse> {
        return this.adapter.post(`course/category/${parameters.category}`);
    }
}
