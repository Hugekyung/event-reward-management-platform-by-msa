import { IEvent } from '@libs/database/interface/event.interface';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IEventFactory } from '../../common/interface/event-factory.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventFactory implements IEventFactory {
    create(dto: CreateEventDto, creatorUserId: string): IEvent {
        return {
            name: dto.name,
            description: dto.description,
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
            type: dto.type,
            conditions: {
                type: dto.conditions.type,
                description: dto.conditions.description,
            },
            rewards: dto.rewardIds.map((id) => new Types.ObjectId(id)),
            createdBy: new Types.ObjectId(creatorUserId),
        };
    }
}
