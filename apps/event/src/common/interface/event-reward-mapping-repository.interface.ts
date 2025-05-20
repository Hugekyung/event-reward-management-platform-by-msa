import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { Types } from 'mongoose';

export interface IEventRewardMappingRepository {
    increaseQuantity(eventId: string, rewardId: string): Promise<void>;
    findRewardByEventId(eventId: string): Promise<IRewardWithId | null>;
    create(mapping: {
        eventId: string | Types.ObjectId;
        rewardId: string | Types.ObjectId;
        quantity: number;
    }): Promise<void>;
}
