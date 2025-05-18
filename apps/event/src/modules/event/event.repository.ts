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

    async create(dto: CreateEventDto): Promise<Event> {
        return this.eventModel.create(dto);
    }

    async findAll(): Promise<Event[]> {
        return this.eventModel.find().lean();
    }

    async findById(id: string): Promise<Event> {
        return this.eventModel.findById(id).lean();
    }
}
