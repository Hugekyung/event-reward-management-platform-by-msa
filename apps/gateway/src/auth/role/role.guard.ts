import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../common/enum/user-role.enum';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const canRequestRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!canRequestRoles.length) {
            return true;
        }

        const { user }: { user: JwtPayload } = context
            .switchToHttp()
            .getRequest();
        return canRequestRoles.includes(user.role);
    }
}
