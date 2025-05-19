import { IUserWithId } from '@libs/database/interface/user.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
    JwtServiceToken,
    UserRepositoryToken,
} from '../../common/constants/token.constants';
import { IAuthService } from '../../common/interface/auth-service.interface';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { IJwtService } from '../../common/interface/jwt-service.interface';
import { IUserRepository } from '../../common/interface/user-repository.interface';
import { PasswordUtil } from '../../common/utils/password.util';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,
        @Inject(JwtServiceToken)
        private readonly jwtService: IJwtService,
    ) {}

    async login(dto: LoginUserDto): Promise<TokenResponseDto> {
        const user: IUserWithId = await this.userRepository.findByEmail(
            dto.email,
        );
        if (
            !user ||
            !(await PasswordUtil.verify(dto.password, user.password))
        ) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // * 첫 로그인 카운트 증가
        await this.userRepository.increaseLoginCount(user._id.toString());

        const { accessToken, refreshToken } = this.jwtService.issueTokens(user);
        await this.jwtService.storeRefreshToken(user._id, refreshToken);

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
        const payload: JwtPayload =
            this.jwtService.verifyRefreshToken(refreshToken);
        await this.jwtService.validateRefreshToken(payload.sub, refreshToken);

        const user = await this.userRepository.findById(payload.sub);
        const tokens = this.jwtService.issueTokens(user);
        await this.jwtService.storeRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }
}
