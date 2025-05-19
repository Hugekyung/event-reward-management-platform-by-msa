import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { EventType } from '@libs/enum/event-type.enum';
import { CreateRewardDto } from '../../modules/reward/dto/create-reward.dto';

export interface IRewardService {
    createReward(dto: CreateRewardDto): Promise<IRewardWithId>;
    findAllRewards(): Promise<IRewardWithId[]>;
    findRewardById(rewardId: string): Promise<IRewardWithId | null>;
    requestReward(
        userId: string,
        eventId: string,
        type: EventType,
    ): Promise<void>;
}
