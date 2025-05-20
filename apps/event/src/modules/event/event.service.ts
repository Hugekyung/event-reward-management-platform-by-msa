import { IEventWithId } from '@libs/database/interface/event.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
    EventFactoryToken,
    EventRepositoryToken,
    EventRewardMappingRepositoryToken,
} from '../../common/constants/token.constants';
import { IEventFactory } from '../../common/interface/event-factory.interface';
import { IEventRepository } from '../../common/interface/event-repository.interface';
import { IEventRewardMappingRepository } from '../../common/interface/event-reward-mapping-repository.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
    constructor(
        @Inject(EventRepositoryToken)
        private readonly eventRepository: IEventRepository,
        @Inject(EventFactoryToken)
        private readonly eventFactory: IEventFactory,
        @Inject(EventRewardMappingRepositoryToken)
        private readonly eventRewardMappingRepository: IEventRewardMappingRepository,
    ) {}

    async createEvent(
        createEventDto: CreateEventDto,
        creatorUserId: string,
    ): Promise<IEventWithId> {
        const eventObject = this.eventFactory.create(
            createEventDto,
            creatorUserId,
        );
        const event = await this.eventRepository.create(eventObject);
        await Promise.all(
            createEventDto.rewardIds.map((rewardId) =>
                this.eventRewardMappingRepository.create({
                    eventId: event._id,
                    rewardId,
                    quantity: 0,
                }),
            ),
        );

        return event;
    }

    async findAllEvents(): Promise<IEventWithId[]> {
        return await this.eventRepository.findAll();
    }

    async findEventById(eventId: string): Promise<IEventWithId> {
        return await this.eventRepository.findById(eventId);
    }
}
