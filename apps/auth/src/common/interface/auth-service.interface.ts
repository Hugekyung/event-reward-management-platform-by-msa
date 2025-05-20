import { CreateAdminUserDto } from '../../modules/auth/dto/create-admin-user.dto';
import { CreateUserDto } from '../../modules/auth/dto/create-user.dto';
import { LoginUserDto } from '../../modules/auth/dto/login-user.dto';
import { TokenResponseDto } from '../../modules/auth/dto/token-response.dto';

export interface IAuthService {
    createUser(
        createUserDto: CreateUserDto | CreateAdminUserDto,
    ): Promise<void>;
    login(dto: LoginUserDto): Promise<TokenResponseDto>;
    refreshToken(refreshToken: string): Promise<TokenResponseDto>;
}
