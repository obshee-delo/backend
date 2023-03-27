import { Body, Controller, Response, Post, UseGuards } from '@nestjs/common';
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { PermissionsGuard } from '@backend/security/guards/permissions.guard';
import { ClientJwtGuard } from '@backend/security/guards/jwt.guard';
import { Permissions, SetPermissions } from '@backend/security/permissions/permissions';
import { UserConfirmPasswordResetDto, UserConfirmRegistrationDto, UserLoginDto, UserRegisterDto, UserResetPasswordDto, UserRetryPasswordResetVerificationDto, UserRetryRegistrationVerificationDto, UserSetPasswordDto } from './dto';
import { UserAuthorizationResponse } from './responses';
import { plainToClass } from 'class-transformer';
import { EmailVerificationService } from 'src/auth/verification/email/email.service';
import { Environment } from 'config/interfaces/environment';
import { ConfigService } from '@nestjs/config';


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
        public service: UserService,
        private emailVerificationService: EmailVerificationService,
        private configService: ConfigService<Environment>
    ) {}

    @Post('register')
    @SetPermissions('user.auth')
    public async register(
        @Body() data: UserRegisterDto
    ): Promise<User> {
        const user = await this.service.register(plainToClass(User, data));

        await this.emailVerificationService.verify({
            id: user.id,
            action: 'registration',
            email: user.email,
            purpose: 'Подтверждение регистрации',
            gatewayUrl: this.configService.get<string>('VERIFICATION_GATEWAY_URL')
        });

        return user;
    }

    @Post('register/confirm')
    @SetPermissions('user.auth')
    public async confirmRegistration(
        @Body() data: UserConfirmRegistrationDto
    ): Promise<UserAuthorizationResponse> {
        return {
            token: await this.service.confirmRegistration(data)
        }
    }

    @Post('register/retryVerification')
    @SetPermissions('user.auth')
    public async retryRegistrationVerification(
        @Body() data: UserRetryRegistrationVerificationDto,
        @Response({ passthrough: true }) response
    ): Promise<void> {
        await this.emailVerificationService.retry({
            id: data.id,
            action: 'registration'
        });

        response.status(200);
    }

    @Post('login')
    @SetPermissions('user.auth')
    public async login(
        @Body() data: UserLoginDto
    ): Promise<UserAuthorizationResponse> {
        return {
            token: await this.service.login(data)
        };
    }

    @Post('resetPassword')
    @SetPermissions('user.auth')
    public async resetPassword(
        @Body() data: UserResetPasswordDto,
        @Response({ passthrough: true }) response
    ): Promise<void> {
        const user = await this.service.resetPassword(data);

        await this.emailVerificationService.verify({
            id: user.id,
            action: 'password_reset',
            email: user.email,
            purpose: 'Сброс пароля',
            gatewayUrl: this.configService.get<string>('VERIFICATION_GATEWAY_URL')
        });

        response.status(200);
    }

    @Post('resetPassword/confirm')
    @SetPermissions('user.auth')
    public async confirmPasswordReset(
        @Body() data: UserConfirmPasswordResetDto,
        @Response({ passthrough: true }) response
    ): Promise<UserAuthorizationResponse> {
        return {
            token: await this.service.confirmPasswordReset(data)
        }
    }

    @Post('resetPassword/retryVerification')
    @SetPermissions('user.auth')
    public async retryPasswordResetVerification(
        @Body() data: UserRetryPasswordResetVerificationDto,
        @Response({ passthrough: true }) response
    ): Promise<void> {
        await this.emailVerificationService.retry({
            id: data.id,
            action: 'password_reset'
        });

        response.status(200);
    }

    @Post('setPassword')
    @SetPermissions('user.auth')
    public async setPassword(
        @Body() data: UserSetPasswordDto,
        @Response({ passthrough: true }) response
    ): Promise<void> {
        await this.service.setPassword(data);
        response.status(200);
    }
}
