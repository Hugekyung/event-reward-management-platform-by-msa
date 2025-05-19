export interface IEventConditionStrategy {
    validate(config: Record<string, any>): void;
}
