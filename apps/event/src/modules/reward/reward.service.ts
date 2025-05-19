import {
    IReward,
    IRewardWithId,
} from '@libs/database/interface/reward.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RewardRepositoryToken } from '../../common/constants/token.constants';
import { IRewardRepository } from '../../common/interface/reward-repository.interface';
import { IRewardService } from '../../common/interface/reward-service.interface';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardFactory } from './factory/reward.factory';

@Injectable()
export class RewardService implements IRewardService {
    constructor(
        @Inject(RewardRepositoryToken)
        private readonly rewardRepository: IRewardRepository,
    ) {}

    async createReward(dto: CreateRewardDto): Promise<IRewardWithId> {
        const reward: IReward = RewardFactory.createRewardObject(dto);
        return await this.rewardRepository.create(dto.type, reward);
    }

    async findAllRewards(): Promise<IRewardWithId[]> {
        return await this.rewardRepository.findAll();
    }

    async findRewardById(rewardId: string): Promise<IRewardWithId | null> {
        return await this.rewardRepository.findById(rewardId);
    }
}
