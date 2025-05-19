import { TokenResponseDto } from '../../modules/auth/dto/token-response.dto';
import { LoginUserDto } from '../../modules/user/dto/login-user.dto';

export interface IAuthService {
    login(dto: LoginUserDto): Promise<TokenResponseDto>;
    refreshToken(refreshToken: string): Promise<TokenResponseDto>;
}
