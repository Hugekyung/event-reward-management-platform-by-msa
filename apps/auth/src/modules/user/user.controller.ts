import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserServiceToken } from '../../common/constants/token.constants';
import { IUserService } from '../../common/interface/user-service.interface';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        @Inject(UserServiceToken) private readonly userService: IUserService,
    ) {}

    // * 내부 요청용
    @Get(':userId/attendance-check')
    @ApiOperation({ summary: '첫 로그인 여부 확인' })
    async checkAttendance(
        @Param('userId') userId: string,
    ): Promise<{ ok: boolean }> {
        return await this.userService.checkAttendance(userId);
    }
}
