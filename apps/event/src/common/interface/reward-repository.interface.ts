import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { RewardType } from '@libs/enum/reward-type.enum';

export interface IRewardRepository {
    create(type: RewardType, data: any): Promise<IRewardWithId>;
    findAll(): Promise<IRewardWithId[]>;
    findById(rewardId: string): Promise<IRewardWithId | null>;
    findByEventId(eventId: string): Promise<IRewardWithId | null>;
}
