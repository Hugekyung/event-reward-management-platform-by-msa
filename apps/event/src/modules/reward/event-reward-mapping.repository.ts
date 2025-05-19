import {
    EventRewardMapping,
    EventRewardMappingDocument,
} from '@libs/database/schemas/event-reward-mapping.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
