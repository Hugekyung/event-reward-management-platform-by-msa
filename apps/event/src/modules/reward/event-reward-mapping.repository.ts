import { IRewardWithId } from '@libs/database/interface/reward.interface';
import { toRewardResponseDto } from '@libs/database/mapper/reward.mapper';
import {
    EventRewardMapping,
    EventRewardMappingDocument,
} from '@libs/database/schemas/event-reward-mapping.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IEventRewardMappingRepository } from '../../common/interface/event-reward-mapping-repository.interface';

@Injectable()
export class EventRewardMappingRepository
    implements IEventRewardMappingRepository
{
    constructor(
        @InjectModel(EventRewardMapping.name)
        private readonly model: Model<EventRewardMappingDocument>,
    ) {}

    async increaseQuantity(eventId: string, rewardId: string): Promise<void> {
        await this.model.updateOne(
            { eventId, rewardId },
            { $inc: { quantity: 1 } },
        );
    }

    async findRewardByEventId(eventId: string): Promise<IRewardWithId | null> {
        const mapping = await this.model
            .findOne({ eventId })
            .populate('rewardId')
            .lean();

        if (!mapping || !mapping.rewardId) {
            return null;
        }

        return toRewardResponseDto(mapping.rewardId);
    }

    async create(mapping: {
        eventId: string | Types.ObjectId;
        rewardId: string | Types.ObjectId;
        quantity: number;
    }): Promise<void> {
        await this.model.create({
            ...mapping,
            quantity: 0,
        });
    }
}
