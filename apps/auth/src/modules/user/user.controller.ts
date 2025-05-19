import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserServiceToken } from '../../common/constants/token.constants';
import { IUserService } from '../../common/interface/user-service.interface';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController implements IUserService {
    constructor(
        @Inject(UserServiceToken) private readonly userService: IUserService,
    ) {}

    @Post('register')
    @ApiOperation({ summary: '일반 유저 등록' })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }

    @Post('register-admin')
    @ApiOperation({ summary: '관리자 유저 등록' })
    async createAdminUser(
        @Body() createAdminUserDto: CreateAdminUserDto,
    ): Promise<void> {
        await this.userService.createUser(createAdminUserDto);
    }
}
