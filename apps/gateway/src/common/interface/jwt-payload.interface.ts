import type { UserRole } from '../enum/user-role.enum';

export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}
