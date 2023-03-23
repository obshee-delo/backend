import { ClientJwtGuard } from "@backend/security/guards/jwt.guard";
import { PermissionsGuard } from "@backend/security/guards/permissions.guard";
import { Permissions, SetPermissions } from "@backend/security/permissions/permissions";
import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Course } from "./course.entity";
import { CourseService } from "./course.service";
import { CourseFindByCategoryDto } from "./dto";
import { CourseFindByCategory } from "./interfaces";
import { CourseFindByCategoryResponse } from "./responses";


@Crud({
    model: { type: Course },
    params: {
        id: {
            field: 'id',
            type: 'string',
            primary: true,
            disabled: false
        }
    }
})
@Controller('course')
@UseGuards(ClientJwtGuard, PermissionsGuard)
@SetPermissions('course.crud')
export class CourseController implements CrudController<Course> {
    static {
        Permissions.enlistPermissionsGroup('course', [ 'crud' ])
    }

    constructor(
        public service: CourseService
    ) {}

    @Get('category/:category')
    public async findByCategory(
        @Param() data: CourseFindByCategoryDto
    ): Promise<CourseFindByCategoryResponse> {
        return {
            courses: await this.service.findByCategory(data)
        };
    }
}
