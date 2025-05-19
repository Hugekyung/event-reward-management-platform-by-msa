import { IEvent, IEventWithId } from '@libs/database/interface/event.interface';

export interface IEventRepository {
    create(eventObject: IEvent): Promise<IEventWithId>;
    findAll(): Promise<IEventWithId[]>;
    findById(eventId: string): Promise<IEventWithId>;
}
