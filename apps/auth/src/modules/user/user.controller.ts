import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserServiceToken } from '../../common/constants/token.constants';
import { IUserService } from '../../common/interface/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController implements IUserService {
    constructor(
        @Inject(UserServiceToken) private readonly userService: IUserService,
    ) {}

    @Post('register')
    async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.createUser(dto);
    }
}
