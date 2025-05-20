import { IRewardHistoryWithId } from '../interface/reward-history.interface';

export function toRewardHistoryResponseDto(history: any) {
    console.log('history >', history); //debug
    return {
        _id: history._id.toString(),
        status: history.status,
        createdAt: history.createdAt,
        event: {
            _id: history.eventId._id,
            name: history.eventId.name,
        },
        reward: history.rewardId,
    };
}

export function toRewardHistoriesResponseDto(
    histories: any[],
): IRewardHistoryWithId[] {
    return histories.map(toRewardHistoryResponseDto);
}
