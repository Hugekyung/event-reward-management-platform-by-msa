export interface IUserLogRepository {
    findRecentLoginDates(userId: string, minCount: number): Promise<Date[]>;
}
