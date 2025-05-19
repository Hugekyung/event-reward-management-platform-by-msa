import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from 'apps/event/src/common/strategy/event-condition.strategy';

export class Login7DaysStrategy implements IEventConditionStrategy {
    validate(config: Record<string, any>): void {
        if (typeof config.targetCount !== 'number' || config.targetCount < 7) {
            throw new BadRequestException(
                '출석 이벤트는 최소 7일 이상이어야 합니다.',
            );
        }
        if (config.unit !== 'days') {
            throw new BadRequestException('출석 단위는 days여야 합니다.');
        }
    }
}
