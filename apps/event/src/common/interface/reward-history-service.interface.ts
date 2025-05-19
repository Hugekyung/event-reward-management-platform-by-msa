import {
    AdminRewardHistoryFilterDto,
    RewardHistoryFilterDto,
} from '../../modules/reward/dto/filter-reward-history.dto';
import { RewardHistoryResponseDto } from '../../modules/reward/dto/reward-history-response.dto';

export interface IRewardHistoryService {
    findHistories(
        userId: string | null,
        role: string,
        filter: RewardHistoryFilterDto | AdminRewardHistoryFilterDto,
    ): Promise<RewardHistoryResponseDto>;
}
