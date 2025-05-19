import { RewardType } from '@libs/enum/reward-type.enum';
import { InternalServerErrorException } from '@nestjs/common';
import { IRewardWithId } from '../interface/reward.interface';

export function toRewardResponseDto(reward: any): IRewardWithId {
    const base = {
        _id: reward._id.toString(),
        name: reward.name,
        type: reward.type,
        description: reward.description,
        isActive: reward.isActive,
    };

    switch (reward.type) {
        case RewardType.POINT:
            return {
                ...base,
                amount: reward.amount,
            };
        case RewardType.ITEM:
            return {
                ...base,
                itemGroupName: reward.itemGroupName,
            };
        case RewardType.COUPON:
            return {
                ...base,
                discountAmount: reward.discountAmount,
                minimumOrderPrice: reward.minimumOrderPrice,
            };
        default:
            throw new InternalServerErrorException(
                '유효하지 않은 리워드 타입입니다.',
            );
    }
}

export function toRewardsResponseDto(rewards: any[]): IRewardWithId[] {
    return rewards.map(toRewardResponseDto);
}
