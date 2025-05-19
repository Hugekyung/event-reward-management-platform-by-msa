import { IRewardHistoryWithId } from '../interface/reward-history.interface';
import { toRewardResponseDto } from './reward.mapper';

export function toRewardHistoryResponseDto(history: any) {
    return {
        _id: history._id.toString(),
        status: history.status,
        createdAt: history.createdAt,
        event: {
            _id: history.eventId._id.toString(),
            name: history.eventId.name,
        },
        reward: toRewardResponseDto(history.rewardId),
    };
}

export function toRewardHistoriesResponseDto(
    histories: any[],
): IRewardHistoryWithId[] {
    return histories.map(toRewardHistoryResponseDto);
}
