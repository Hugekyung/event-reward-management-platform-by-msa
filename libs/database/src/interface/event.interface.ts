import { EventType } from '@libs/enum/event-type.enum';
import { Types } from 'mongoose';

export interface IEvent {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
    type: EventType;
    conditions: {
        type: EventType;
        config: Record<string, any>;
        description: string;
    };
    rewards?: Types.ObjectId[];
    createdBy?: Types.ObjectId;
}

export interface IEventWithId extends IEvent {
    _id: Types.ObjectId;
}
