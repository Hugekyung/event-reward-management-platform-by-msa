import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthServiceToken) private readonly authService: IAuthService,
    ) {}

    @Post('login')
    async login(@Body() dto: LoginUserDto): Promise<TokenResponseDto> {
        return this.authService.login(dto);
    }

    @Post('refresh')
    async refresh(
        @Body('refreshToken') refreshToken: string,
    ): Promise<TokenResponseDto> {
        return this.authService.refreshToken(refreshToken);
    }
}
