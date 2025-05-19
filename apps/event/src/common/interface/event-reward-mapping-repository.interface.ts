export interface IEventRewardMappingRepository {
    increaseQuantity(eventId: string, rewardId: string): Promise<void>;
}
