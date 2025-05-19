import { IEventWithId } from '@libs/database/interface/event.interface';
import { CreateEventDto } from '../../modules/event/dto/create-event.dto';

export interface IEventRepository {
    create(dto: CreateEventDto): Promise<IEventWithId>;
    findAll(): Promise<IEventWithId[]>;
    findById(id: string): Promise<IEventWithId>;
}
