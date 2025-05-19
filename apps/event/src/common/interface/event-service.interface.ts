import { IEventWithId } from '@libs/database/interface/event.interface';
import { CreateEventDto } from '../../modules/event/dto/create-event.dto';

export interface IEventService {
    createEvent(createEventDto: CreateEventDto): Promise<IEventWithId>;
    findAllEvents(): Promise<IEventWithId[]>;
    findEventById(eventId: string): Promise<IEventWithId>;
}
