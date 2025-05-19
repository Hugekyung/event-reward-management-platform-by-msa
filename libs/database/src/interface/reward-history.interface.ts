import { RewardHistoryStatus } from '@libs/enum/reward-history-status.enum';
import { Types } from 'mongoose';

export interface IRewardHistory {
    userId: Types.ObjectId | string;
    eventId: Types.ObjectId | string;
    rewardId: Types.ObjectId | string | null;
    status: RewardHistoryStatus;
    reason?: string;
}

export interface IRewardHistoryWithId {
    _id: Types.ObjectId;
}
