export interface IEventConditionStrategy {
    validateLogin7Days(
        userId: string,
        config: Record<string, any>,
    ): Promise<void>;
}
