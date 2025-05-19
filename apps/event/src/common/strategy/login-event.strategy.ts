import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';
import { IUserLogRepository } from '../interface/user-log-repository.interface';

export class AttendanceStrategy implements IEventConditionStrategy {
    constructor(private readonly userLogRepository: IUserLogRepository) {}

    async validateLogin7Days(
        userId: string,
        config: Record<string, any>,
    ): Promise<void> {
        const targetCount = config.targetCount ?? 7;
        const logs = await this.userLogRepository.findRecentLoginDates(
            userId,
            targetCount,
        );
        if (logs.length < targetCount) {
            throw new BadRequestException(
                `최근 ${targetCount}일 간 로그인 기록이 부족합니다.`,
            );
        }
    }
}
