// 📁 libs/database/interface/event.interface.ts
import { Types } from 'mongoose';

export interface IEvent {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
    conditions: {
        type: string;
        detail: string;
    };
    rewards?: Types.ObjectId[];
    createdBy?: Types.ObjectId;
}

export interface IEventWithId extends IEvent {
    _id: Types.ObjectId;
}
