export interface IEventConditionStrategy {
    validate(userId: string, eventId: string): Promise<void>;
}
