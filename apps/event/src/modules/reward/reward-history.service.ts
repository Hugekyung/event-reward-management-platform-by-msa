import { Inject, Injectable } from '@nestjs/common';
import { RewardHistoryRepositoryToken } from '../../common/constants/token.constants';
import { IRewardHistoryRepository } from '../../common/interface/reward-history-repository.interface';
import { IRewardHistoryService } from '../../common/interface/reward-history-service.interface';
import {
    AdminRewardHistoryFilterDto,
    RewardHistoryFilterDto,
} from './dto/filter-reward-history.dto';
import { RewardHistoryResponseDto } from './dto/reward-history-response.dto';
import { RewardHistoryQueryFactory } from './factory/reward-history-query.factory';

@Injectable()
export class RewardHistoryService implements IRewardHistoryService {
    constructor(
        @Inject(RewardHistoryRepositoryToken)
        private readonly rewardHistoryRepository: IRewardHistoryRepository,
    ) {}

    async findHistories(
        userId: string | null,
        role: string,
        filter: RewardHistoryFilterDto | AdminRewardHistoryFilterDto,
    ): Promise<RewardHistoryResponseDto> {
        const queryUserId = 'userId' in filter ? filter.userId : userId;
        const { query, options } = RewardHistoryQueryFactory.createQueryObject(
            queryUserId!,
            role,
            filter,
        );

        const [data, totalCount] = await Promise.all([
            this.rewardHistoryRepository.findHistories(query, options),
            this.rewardHistoryRepository.count(query),
        ]);

        return { data, totalCount };
    }
}
