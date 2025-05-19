import { IEventWithId } from '../interface/event.interface';

export function toEventResponseDto(event: any): IEventWithId {
    return {
        _id: event._id.toString(),
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        isActive: event.isActive,
        type: event.type,
        conditions: event.conditions,
        rewards: event.rewards,
        createdBy: event.createdBy,
    };
}

export function toEventsResponseDto(events: any[]): IEventWithId[] {
    return events.map((event) => toEventResponseDto(event));
}
