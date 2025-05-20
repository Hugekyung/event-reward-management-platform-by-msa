import {
    IRewardHistory,
    IRewardHistoryWithId,
} from '@libs/database/interface/reward-history.interface';
import {
    toRewardHistoriesResponseDto,
    toRewardHistoryResponseDto,
} from '@libs/database/mapper/reward-history.mapper';
import {
    RewardHistory,
    RewardHistoryDocument,
} from '@libs/database/schemas/reward-history.schema';
import { RewardHistoryStatus } from '@libs/enum/reward-history-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRewardHistoryRepository } from '../../common/interface/reward-history-repository.interface';

@Injectable()
export class RewardHistoryRepository implements IRewardHistoryRepository {
    constructor(
        @InjectModel(RewardHistory.name)
        private readonly model: Model<RewardHistoryDocument>,
    ) {}

    async findHistories(
        query: Record<string, any>,
        options: { skip: number; limit: number; sort: any },
    ): Promise<IRewardHistoryWithId[]> {
        const histories = await this.model
            .find(query)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit)
            .populate('eventId', 'name')
            .populate('rewardId')
            .lean();

        return toRewardHistoriesResponseDto(histories);
    }

    async count(query: Record<string, any>): Promise<number> {
        return await this.model.countDocuments(query);
    }

    async create(
        rewardHistoryObject: IRewardHistory,
    ): Promise<IRewardHistoryWithId> {
        const histories = await this.model.create(rewardHistoryObject);
        return toRewardHistoryResponseDto(histories);
    }

    async exists(userId: string, eventId: string): Promise<boolean> {
        const exists = await this.model.exists({
            userId,
            eventId,
            status: RewardHistoryStatus.SUCCESS,
        });
        return exists ? true : false;
    }
}
