import { IEventWithId } from '@libs/database/interface/event.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
    EventFactoryToken,
    EventRepositoryToken,
} from '../../common/constants/token.constants';
import { IEventFactory } from '../../common/interface/event-factory.interface';
import { IEventRepository } from '../../common/interface/event-repository.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
    constructor(
        @Inject(EventRepositoryToken)
        private readonly eventRepository: IEventRepository,
        @Inject(EventFactoryToken)
        private readonly eventFactory: IEventFactory,
    ) {}

    async createEvent(
        createEventDto: CreateEventDto,
        creatorUserId: string,
    ): Promise<IEventWithId> {
        const event = this.eventFactory.create(createEventDto, creatorUserId);
        return await this.eventRepository.create(event);
    }

    async findAllEvents(): Promise<IEventWithId[]> {
        return await this.eventRepository.findAll();
    }

    async findEventById(eventId: string): Promise<IEventWithId> {
        return await this.eventRepository.findById(eventId);
    }
}
