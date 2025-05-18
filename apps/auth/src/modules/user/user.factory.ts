import { User } from '@libs/database/schemas/user.schema';
import { UserRole } from '@libs/enum/user-role.enum';

export class UserFactory {
    static create(data: CreateUserDto, hashedPassword: string): Partial<User> {
        return {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role: UserRole.USER,
        };
    }
}
