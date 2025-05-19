import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IRewardService } from '../../common/interface/reward-service.interface';
import { CreateRewardDto } from './dto/create-reward.dto';

@ApiTags('Reward')
@Controller('rewards')
export class RewardController {
    constructor(
        @Inject('RewardServiceToken')
        private readonly rewardService: IRewardService,
    ) {}

    @Post()
    async createReward(
        @Body() createRewardDto: CreateRewardDto,
    ): Promise<IRewardWithId> {
        return await this.rewardService.createReward(createRewardDto);
    }

    @Get()
    async findAllRewards(): Promise<IRewardWithId[]> {
        return await this.rewardService.findAllRewards();
    }

    @Get(':rewardId')
    async findRewardById(
        @Param() rewardId: string,
    ): Promise<IRewardWithId | null> {
        return await this.rewardService.findRewardById(rewardId);
    }
}
