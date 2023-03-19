import { ClientJwtGuard } from '@backend/security/guards/jwt.guard';
import { PermissionsGuard} from '@backend/security/guards/permissions.guard';
import { Permissions, SetPermissions } from '@backend/security/permissions/permissions';
import { Controller, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { AuthorizationResponse } from './responses/auth.response';
import { RefreshDto } from './dto/refresh.dto';


@Controller('client')
@SetPermissions('client')
export class ClientController {
    static {
        Permissions.enlistPermissionsGroup('client', [ 'auth' ])
    }

    constructor(
        private clientService: ClientService,
        private configService: ConfigService
    ) {}

    /**
     * (Endpoint)
     * Creates an application with all rights, if none exists.
     * Returns JWT-token of that application.
     */
    @Post('openAccess')
    public async openAccess(): Promise<AuthorizationResponse> {
        return {
            token: await this.clientService.openAccess(),
            secret: this.configService.get<string>('jwtSecret')
        };
    }

    @Post('signup')
    @UseGuards(ClientJwtGuard, PermissionsGuard)
    @SetPermissions('client.auth')
    public async signUp(
        @Query() data: DeepPartial<Client>
    ): Promise<AuthorizationResponse> {
        return {
            token: await this.clientService.signUp(data),
            secret: this.configService.get<string>('jwtSecret')
        };
    }

    @Post('refresh')
    @UseGuards(ClientJwtGuard, PermissionsGuard)
    @SetPermissions('client.auth')
    public async refresh(
        @Query(ParseUUIDPipe) data: RefreshDto
    ): Promise<AuthorizationResponse> {
        return {
            token: await this.clientService.refresh(data),
            secret: this.configService.get<string>('jwtSecret')
        };
    }
}
