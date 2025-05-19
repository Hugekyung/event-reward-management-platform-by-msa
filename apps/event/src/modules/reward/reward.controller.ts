import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'libs/shared/get-user.decorator';
import {
    RewardHistoryServiceToken,
    RewardServiceToken,
} from '../../common/constants/token.constants';
import { Roles } from '../../common/decorators/role.decorator';
import { IRewardHistoryService } from '../../common/interface/reward-history-service.interface';
import { IRewardService } from '../../common/interface/reward-service.interface';
import { CreateRewardDto } from './dto/create-reward.dto';
import {
    AdminRewardHistoryFilterDto,
    RewardHistoryFilterDto,
} from './dto/filter-reward-history.dto';

@ApiTags('Reward')
@Controller('rewards')
export class RewardController {
    constructor(
        @Inject(RewardServiceToken)
        private readonly rewardService: IRewardService,
        @Inject(RewardHistoryServiceToken)
        private readonly service: IRewardHistoryService,
    ) {}

    @Post()
    @ApiOperation({ summary: '이벤트 보상 신규 등록' })
    async createReward(
        @Body() createRewardDto: CreateRewardDto,
    ): Promise<IRewardWithId> {
        return await this.rewardService.createReward(createRewardDto);
    }

    @Get()
    @ApiOperation({ summary: '모든 이벤트 보상 조회' })
    async findAllRewards(): Promise<IRewardWithId[]> {
        return await this.rewardService.findAllRewards();
    }

    @Get(':rewardId')
    @ApiOperation({ summary: '이벤트 보상 상세 조회' })
    async findRewardById(
        @Param() rewardId: string,
    ): Promise<IRewardWithId | null> {
        return await this.rewardService.findRewardById(rewardId);
    }

    @Get('histories/me')
    @Roles(UserRole.USER)
    @ApiOperation({ summary: '본인의 이벤트 보상 요청 내역 확인(일반 유저)' })
    getMyRewardHistories(
        @GetUser() user: any, // ! 타입
        @Query() filter: RewardHistoryFilterDto,
    ) {
        return this.service.findHistories(user._id, user.role, filter);
    }

    @Get('histories')
    @Roles(UserRole.OPERATOR, UserRole.AUDITOR, UserRole.ADMIN)
    @ApiOperation({ summary: '이벤트 보상 요청 내역 확인(관리자)' })
    getAllRewardHistories(@Query() filter: AdminRewardHistoryFilterDto) {
        return this.service.findHistories(null, 'ADMIN', filter);
    }
}
