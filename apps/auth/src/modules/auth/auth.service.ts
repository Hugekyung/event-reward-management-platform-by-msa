import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '../../common/interface/auth.service.interface';
import { IJwtService } from '../../common/interface/jwt-service.interface';
import { PasswordUtil } from '../../common/utils/password.util';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(UserRepositoryToken) private readonly userRepo: IUserRepository,
        @Inject(JwtServiceToken) private readonly jwtService: IJwtService,
    ) {}

    async login(dto: LoginUserDto): Promise<TokenResponseDto> {
        const user = await this.userRepo.findByEmail(dto.email);
        if (
            !user ||
            !(await PasswordUtil.verify(dto.password, user.password))
        ) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { accessToken, refreshToken } =
            await this.jwtService.issueTokens(user);
        await this.jwtService.storeRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
        const payload = this.jwtService.verifyRefreshToken(refreshToken);
        await this.jwtService.validateRefreshToken(payload.sub, refreshToken);

        const user = await this.userRepo.findById(payload.sub);
        const tokens = await this.jwtService.issueTokens(user);
        await this.jwtService.storeRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}
