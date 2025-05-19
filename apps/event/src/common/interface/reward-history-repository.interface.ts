import { IRewardHistoryWithId } from '@libs/database/interface/reward-history.interface';

export interface IRewardHistoryRepository {
    findHistories(
        query: Record<string, any>,
        options: any,
    ): Promise<IRewardHistoryWithId[]>;
    count(query: Record<string, any>): Promise<number>;
    create(rewardHistoryObject): Promise<IRewardHistoryWithId>;
    exists(userId: string, eventId: string): Promise<boolean>;
}
