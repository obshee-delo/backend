import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { environmentConfigFactory } from "config/environment.config";
import { AuthService } from "./auth.service";


@Module({
    imports: [
        JwtModule.register({
            secret: environmentConfigFactory().jwtSecret
        })
    ],
    controllers: [],
    providers: [
        AuthService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
