import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { AuthModule } from '../auth/auth.module';
import { SecurityModule } from '@backend/security';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ Client ]),
        AuthModule,
        SecurityModule
    ],
    providers: [
        ClientService
    ],
    controllers: [
        ClientController
    ],
    exports: [
        ClientService
    ]
})
export class ClientModule {}
