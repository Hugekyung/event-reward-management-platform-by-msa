import type { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../../../../libs/enum/src/user-role.enum';
import { RolesGuard } from '../role.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    beforeEach(() => {
        reflector = new Reflector();
        guard = new RolesGuard(reflector);
    });

    it('should allow access if no roles are required', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({ user: { role: UserRole.USER } }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        } as unknown as ExecutionContext;

        expect(guard.canActivate(mockContext)).toBe(true);
    });

    it('should deny access if role does not match', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
            UserRole.ADMIN,
        ]);

        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({ user: { role: UserRole.USER } }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        } as unknown as ExecutionContext;

        expect(guard.canActivate(mockContext)).toBe(false);
    });
});
