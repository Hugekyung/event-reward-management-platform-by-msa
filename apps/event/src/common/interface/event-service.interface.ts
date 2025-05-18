import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../schema/event.schema';

export interface IEventService {
    createEvent(dto: CreateEventDto): Promise<Event>;
    findAllEvents(): Promise<Event[]>;
    findEventById(id: string): Promise<Event>;
}
