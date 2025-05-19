import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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

    // * 내부 요청용
    @Get(':userId/attendance-check')
    @ApiOperation({ summary: '첫 로그인 여부 확인' })
    async checkAttendance(
        @Param('userId') userId: string,
    ): Promise<{ ok: boolean }> {
        return await this.userService.checkAttendance(userId);
    }
}
