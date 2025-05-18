import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        @Inject(UserServiceToken) private readonly userService: IUserService,
    ) {}

    @Post('register')
    async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.createUser(dto);
    }
}
