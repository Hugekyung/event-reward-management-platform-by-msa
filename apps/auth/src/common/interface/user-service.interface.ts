export interface IUserService {
    checkAttendance(userId: string): Promise<{ ok: boolean }>;
}
