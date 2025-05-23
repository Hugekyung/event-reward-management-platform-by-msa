import { IUser } from '@libs/database/interface/user.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import { CreateAdminUserDto } from './create-admin-user.dto';
import { CreateUserDto } from './create-user.dto';

export class UserFactory {
    static create(
        data: CreateUserDto | CreateAdminUserDto,
        hashedPassword: string,
        role: UserRole,
    ): IUser {
        return {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role,
        };
    }
}
