import { IEvent } from '@libs/database/interface/event.interface';
import { CreateEventDto } from '../../modules/event/dto/create-event.dto';

export interface IEventFactory {
    create(createEventDto: CreateEventDto, creatorUserId: string): IEvent;
}
