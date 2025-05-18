import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../schema/event.schema';

export interface IEventRepository {
    create(dto: CreateEventDto): Promise<Event>;
    findAll(): Promise<Event[]>;
    findById(id: string): Promise<Event>;
}
