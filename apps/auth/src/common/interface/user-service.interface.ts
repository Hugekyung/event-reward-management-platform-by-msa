import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { UserResponseDto } from '../../modules/user/dto/user-response.dto';

export interface IUserService {
    createUser(dto: CreateUserDto): Promise<UserResponseDto>;
}
