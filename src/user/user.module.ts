import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AuthModule } from '../auth/auth.module';
import { SecurityModule } from "@backend/security";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ User ]),
        AuthModule,
        SecurityModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
