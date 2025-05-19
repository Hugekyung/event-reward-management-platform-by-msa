import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthServiceToken } from '../../common/constants/token.constants';
import { IAuthService } from '../../common/interface/auth-service.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthServiceToken) private readonly authService: IAuthService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: '회원 로그인' })
    async login(@Body() loginUserDto: LoginUserDto): Promise<TokenResponseDto> {
        return this.authService.login(loginUserDto);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'access token 재발급' })
    async refresh(
        @Body('refreshToken') refreshToken: string,
    ): Promise<TokenResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}
