import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthServiceToken } from '../../common/constants/token.constants';
import { IAuthService } from '../../common/interface/auth-service.interface';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthServiceToken) private readonly authService: IAuthService,
    ) {}

    @Post('register')
    @HttpCode(201)
    @ApiOperation({ summary: '일반 유저 등록' })
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        await this.authService.createUser(createUserDto);
        return { message: '회원가입이 완료되었습니다.' };
    }

    @Post('register-admin')
    @HttpCode(201)
    @ApiOperation({ summary: '관리자 유저 등록' })
    async createAdminUser(
        @Body() createAdminUserDto: CreateAdminUserDto,
    ): Promise<{ message: string }> {
        await this.authService.createUser(createAdminUserDto);
        return { message: '관리자 계정 등록이 완료되었습니다.' };
    }

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
