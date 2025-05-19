import { RewardType } from '@libs/enum/reward-type.enum';
import { Types } from 'mongoose';

export interface IBaseReward {
    name: string;
    type: RewardType;
    description?: string;
    isActive?: boolean;
}

export interface IPointReward extends IBaseReward {
    type: RewardType.POINT;
    amount: number;
}

export interface IItemReward extends IBaseReward {
    type: RewardType.ITEM;
    itemGroupName: string;
}

export interface ICouponReward extends IBaseReward {
    type: RewardType.COUPON;
    discountAmount: number;
    minimumOrderPrice: number;
}

export interface IPointRewardWithId extends IPointReward {
    _id: Types.ObjectId;
}

export interface IItemRewardWithId extends IItemReward {
    _id: Types.ObjectId;
}

export interface ICouponRewardWithId extends ICouponReward {
    _id: Types.ObjectId;
}

export type IReward = IPointReward | IItemReward | ICouponReward; // * _id가 없는 union 타입
export type IRewardWithId =
    | IPointRewardWithId
    | IItemRewardWithId
    | ICouponRewardWithId; // * _id가 있는 union 타입
