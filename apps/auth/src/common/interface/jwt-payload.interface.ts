import { UserRole } from '@libs/enum/user-role.enum';

export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}
