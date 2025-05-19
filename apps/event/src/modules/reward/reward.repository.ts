import { IRewardWithId } from '@libs/database/interface/reward.interface';
import {
    toRewardResponseDto,
    toRewardsResponseDto,
} from '@libs/database/mapper/reward.mapper';
import { Reward, RewardDocument } from '@libs/database/schemas/reward.schema';
import { RewardType } from '@libs/enum/reward-type.enum';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRewardRepository } from '../../common/interface/reward-repository.interface';

@Injectable()
export class RewardRepository implements IRewardRepository {
    constructor(
        @InjectModel(Reward.name)
        private readonly rewardModel: Model<RewardDocument>,
    ) {}

    private resolveModel(type: RewardType): Model<any> {
        const discriminator = this.rewardModel.discriminators?.[type];
        if (!discriminator) {
            throw new BadRequestException('해당 타입에 대한 모델이 없습니다.');
        }
        return discriminator;
    }

    async create(type: RewardType, data: any): Promise<IRewardWithId> {
        const model = this.resolveModel(type);
        return await model.create(data);
    }

    async findAll(): Promise<IRewardWithId[]> {
        const rewards = await this.rewardModel.find().lean();
        return toRewardsResponseDto(rewards);
    }

    async findById(rewardId: string): Promise<IRewardWithId | null> {
        const reward = await this.rewardModel.findById(rewardId).lean();
        return toRewardResponseDto(reward);
    }

    async findByEventId(eventId: string): Promise<IRewardWithId | null> {
        const reward = await this.rewardModel.findOne({ eventId }).lean();
        return toRewardResponseDto(reward);
    }
}
