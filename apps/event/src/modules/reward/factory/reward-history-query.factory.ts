import {
    AdminRewardHistoryFilterDto,
    RewardHistoryFilterDto,
} from '../dto/filter-reward-history.dto';

export class RewardHistoryQueryFactory {
    static createQueryObject(
        userId: string | null,
        role: string,
        filter: RewardHistoryFilterDto | AdminRewardHistoryFilterDto,
    ): {
        query: Record<string, any>;
        options: { skip: number; limit: number; sort: any };
    } {
        const query: Record<string, any> = {};
        if (role === 'USER') {
            query.userId = userId;
        }

        if (role !== 'USER' && 'userId' in filter && filter.userId) {
            query.userId = filter.userId;
        }

        if (filter.eventId) query.eventId = filter.eventId;
        if (filter.status) query.status = filter.status;

        const page = filter.page ?? 1;
        const perPage = filter.perPage ?? 10;
        const sort = filter.sort === 2 ? { createdAt: 1 } : { createdAt: -1 };

        return {
            query,
            options: {
                skip: (page - 1) * perPage,
                limit: perPage,
                sort,
            },
        };
    }
}
