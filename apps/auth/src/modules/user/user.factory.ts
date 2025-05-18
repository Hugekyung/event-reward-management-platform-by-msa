import { IUser } from '@libs/database/interface/user.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';

export class UserFactory {
    static create(data: CreateUserDto, hashedPassword: string): Partial<IUser> {
        return {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role: UserRole.USER,
        };
    }
}
