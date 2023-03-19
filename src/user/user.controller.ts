import { Controller, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { PermissionsGuard } from '@backend/security/guards/permissions.guard';
import { ClientJwtGuard } from '@backend/security/guards/jwt.guard';
import { Permissions, SetPermissions } from '@backend/security/permissions/permissions';
import { DeepPartial } from 'typeorm';
import { UserLoginDto } from './dto/login.dto';
import { AuthorizationResponse } from './responses/auth.response';
import { UserLogin } from './interfaces';


@Crud({
    model: { type: User },
    params: {
        id: {
            field: 'id',
            type: 'string',
            primary: true,
            disabled: false
        }
    }
})
@Controller('user')
@UseGuards(ClientJwtGuard, PermissionsGuard)
@SetPermissions('user.crud')
export class UserController implements CrudController<User> {
    static {
        Permissions.enlistPermissionsGroup('user', [ 'crud', 'auth' ])
    }

    constructor(
        public service: UserService
    ) {}

    @Post('signup')
    @SetPermissions('user.auth')
    public async signUp(
        @Query() data: DeepPartial<User>
    ): Promise<AuthorizationResponse> {
        return {
            token: await this.service.signUp(data)
        };
    }

    @Post('login')
    @SetPermissions('user.auth')
    public async login(
        @Query() data: UserLoginDto
    ): Promise<AuthorizationResponse> {
        return {
            token: await this.service.login(data as UserLogin)
        };
    }
}
