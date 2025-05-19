import { IEventWithId } from '@libs/database/interface/event.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EventRepositoryToken } from '../../common/constants/token.constants';
import { IEventRepository } from '../../common/interface/event-repository.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
    constructor(
        @Inject(EventRepositoryToken)
        private readonly eventRepository: IEventRepository,
    ) {}

    async createEvent(dto: CreateEventDto): Promise<IEventWithId> {
        return await this.eventRepository.create(dto);
    }

    async findAllEvents(): Promise<IEventWithId[]> {
        return await this.eventRepository.findAll();
    }

    async findEventById(id: string): Promise<IEventWithId> {
        return await this.eventRepository.findById(id);
    }
}
