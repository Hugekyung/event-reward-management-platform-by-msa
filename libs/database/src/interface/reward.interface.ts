import { RewardType } from '@libs/enum/reward-type.enum';
import { Types } from 'mongoose';

export interface IBaseReward {
    name: string;
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

export interface IPointRewardWithId extends IPointReward {
    _id: Types.ObjectId;
}

export interface IItemRewardWithId extends IItemReward {
    _id: Types.ObjectId;
}

export type IReward = IPointReward | IItemReward; // * _id가 없는 union 타입
export type IRewardWithId = IPointRewardWithId | IItemRewardWithId; // * _id가 있는 union 타입
