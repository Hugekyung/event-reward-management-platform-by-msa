import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { CreateRewardDto } from '../../modules/reward/dto/create-reward.dto';

export interface IRewardService {
    createReward(dto: CreateRewardDto): Promise<IRewardWithId>;
    findAllRewards(): Promise<IRewardWithId[]>;
    findRewardById(rewardId: string): Promise<IRewardWithId | null>;
}
