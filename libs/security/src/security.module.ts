import { Module } from "@nestjs/common";
import { AdminJwtGuard, ClientJwtGuard } from "./guards/jwt.guard";
import { PermissionsGuard } from "./guards/permissions.guard";
import { AdminJwtStrategy, ClientJwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        })
    ],
    providers: [
        AdminJwtGuard,
        ClientJwtGuard,
        PermissionsGuard,
        AdminJwtStrategy,
        ClientJwtStrategy
    ]
})
export class SecurityModule {}
