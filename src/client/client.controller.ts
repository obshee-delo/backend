import { AdminJwtGuard } from '@backend/security/guards/jwt.guard';
import { PermissionsGuard} from '@backend/security/guards/permissions.guard';
import { Permissions } from '@backend/security/permissions/permissions';
import { Body, Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientService } from './client.service';
import { AuthorizationResponse } from './responses/index';
import { ClientRefreshDto, ClientSignUpDto } from './dto';
import { Environment } from 'config/interfaces/environment';


@Controller('client')
export class ClientController {
    static {
        Permissions.enlistPermissionsGroup('client', [ 'auth' ])
    }

    constructor(
        private clientService: ClientService,
        private configService: ConfigService<Environment>
    ) {}

    @Post('signup')
    @UseGuards(AdminJwtGuard, PermissionsGuard)
    public async signUp(
        @Body() data: ClientSignUpDto
    ): Promise<AuthorizationResponse> {
        return {
            token: await this.clientService.signUp(data),
            secret: this.configService.get<string>('JWT_SECRET')
        };
    }

    @Post(':refresh')
    @UseGuards(AdminJwtGuard, PermissionsGuard)
    public async refresh(
        @Param() data: ClientRefreshDto
    ): Promise<AuthorizationResponse> {
        return {
            token: await this.clientService.refresh(data),
            secret: this.configService.get<string>('JWT_SECRET')
        };
    }
}
