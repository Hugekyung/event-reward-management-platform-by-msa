import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from './event-condition.strategy';

export class ObjectUpgradeStrategy implements IEventConditionStrategy {
    validate(config: Record<string, any>): void {
        if (typeof config.upgradeLevel !== 'number') {
            throw new BadRequestException('업그레이드 레벨이 숫자여야 합니다.');
        }
    }
}
