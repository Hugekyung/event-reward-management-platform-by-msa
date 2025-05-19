import { RewardHistoryStatus } from '@libs/enum/reward-history-status.enum';
import { Types } from 'mongoose';

export interface IRewardHistory {
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    rewardId: Types.ObjectId;
    status: RewardHistoryStatus;
    reason?: string;
}

export interface IRewardHistoryWithId {
    _id: Types.ObjectId;
}
