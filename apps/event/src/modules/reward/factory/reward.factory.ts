import {
    ICouponReward,
    IItemReward,
    IPointReward,
    IReward,
} from '@libs/database/interface/reward.interface';
import { RewardType } from '@libs/enum/reward-type.enum';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRewardDto } from '../dto/create-reward.dto';

@Injectable()
export class RewardFactory {
    static createRewardObject(dto: CreateRewardDto): IReward {
        switch (dto.type) {
            case RewardType.POINT:
                const pointReward: IPointReward = {
                    name: dto.name,
                    type: dto.type,
                    description: dto.description,
                    amount: +dto.amount!,
                    isActive: true,
                };
                return pointReward;
            case RewardType.ITEM:
                const itemReward: IItemReward = {
                    name: dto.name,
                    type: dto.type,
                    description: dto.description,
                    itemGroupName: dto.itemGroupName!,
                    isActive: true,
                };
                return itemReward;
            case RewardType.COUPON:
                const couponReward: ICouponReward = {
                    name: dto.name,
                    type: dto.type,
                    description: dto.description,
                    discountAmount: +dto.discountAmount!,
                    minimumOrderPrice: +dto.minimumOrderPrice!,
                    isActive: true,
                };
                return couponReward;
            default:
                throw new BadRequestException('알 수 없는 보상 타입입니다.');
        }
    }
}
