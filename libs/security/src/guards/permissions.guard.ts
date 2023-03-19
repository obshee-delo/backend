import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from '../permissions/permissions';


/*
 * Should ONLY be used for application authentification.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>('PERMISSIONS', [
              context.getHandler(),
              context.getClass(),
        ]);

        if (!requiredPermissions) return true;

        const { user: { permissions } } = context.switchToHttp().getRequest();
        
        return Permissions.verify(requiredPermissions, permissions);
    }
}
