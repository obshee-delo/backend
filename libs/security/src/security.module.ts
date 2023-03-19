import { Module } from "@nestjs/common";
import { AdminGuard } from "./guards/admin.guard";
import { UserJwtGuard, ClientJwtGuard } from "./guards/jwt.guard";
import { PermissionsGuard } from "./guards/permissions.guard";
import { ClientJwtStrategy, UserJwtStrategy } from "./strategies/jwt.strategy";


@Module({
    providers: [
        AdminGuard,
        UserJwtGuard,
        ClientJwtGuard,
        PermissionsGuard,
        UserJwtStrategy,
        ClientJwtStrategy
    ]
})
export class SecurityModule {}
