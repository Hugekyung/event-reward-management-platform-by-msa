import { CreateAdminUserDto } from '../../modules/user/dto/create-admin-user.dto';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';

export interface IUserService {
    createUser(
        createUserDto: CreateUserDto | CreateAdminUserDto,
    ): Promise<void>;
    checkAttendance(userId: string): Promise<{ ok: boolean }>;
}
