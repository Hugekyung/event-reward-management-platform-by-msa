import { IRewardHistoryWithId } from '@libs/database/interface/reward-history.interface';

export interface RewardHistoryResponseDto {
    data: IRewardHistoryWithId[];
    totalCount: number;
}
