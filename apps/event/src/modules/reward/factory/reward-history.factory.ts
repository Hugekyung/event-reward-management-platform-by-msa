import { IRewardHistory } from '@libs/database/interface/reward-history.interface';
import { RewardHistoryStatus } from '@libs/enum/reward-history-status.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardHistoryFactory {
    static createSuccess(
        userId: string,
        eventId: string,
        rewardId: string,
    ): IRewardHistory {
        return {
            userId,
            eventId,
            rewardId,
            status: RewardHistoryStatus.SUCCESS,
        };
    }

    static createFailure(
        userId: string,
        eventId: string,
        reason: string,
    ): IRewardHistory {
        return {
            userId,
            eventId,
            rewardId: null,
            status: RewardHistoryStatus.FAILED,
            reason,
        };
    }
}
