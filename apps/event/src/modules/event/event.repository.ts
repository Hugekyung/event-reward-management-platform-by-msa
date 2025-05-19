import { IEventWithId } from '@libs/database/interface/event.interface';
import {
    toEventResponseDto,
    toEventsResponseDto,
} from '@libs/database/mapper/event.mapper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEventRepository } from '../../common/interface/event-repository.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventRepository implements IEventRepository {
    constructor(
        @InjectModel(Event.name)
        private readonly eventModel: Model<Event>,
    ) {}

    async create(dto: CreateEventDto): Promise<IEventWithId> {
        const event = await this.eventModel.create(dto);
        return toEventResponseDto(event);
    }

    async findAll(): Promise<IEventWithId[]> {
        const events = await this.eventModel.find().lean();
        return toEventsResponseDto(events);
    }

    async findById(id: string): Promise<IEventWithId> {
        const event = await this.eventModel.findById(id).lean();
        return toEventResponseDto(event);
    }
}
