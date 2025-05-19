import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';
import { IUserLogRepository } from '../interface/user-log-repository.interface';

export class AttendanceStrategy implements IEventConditionStrategy {
    constructor(private readonly userLogRepository: IUserLogRepository) {}

    async validate(userId: string, config: Record<string, any>): Promise<void> {
        const hasLoggedIn =
            await this.userLogRepository.hasLoggedInBefore(userId);
        if (!hasLoggedIn) {
            throw new BadRequestException(
                '첫 로그인한 유저만 보상을 받을 수 있습니다.',
            );
        }
    }
}
