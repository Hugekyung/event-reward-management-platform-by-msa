import { EventType } from '@libs/enum/event-type.enum';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EventConditionStrategyTokenMap } from '../constants/token.constants';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';

@Injectable()
export class EventConditionContext {
    constructor(
        @Inject(EventConditionStrategyTokenMap)
        private readonly strategies: Record<EventType, IEventConditionStrategy>,
    ) {}

    async validate(type: EventType, userId: string, eventId: string) {
        const strategy = this.strategies[type];
        if (!strategy) {
            throw new BadRequestException(
                `지원되지 않는 이벤트 타입입니다: ${type}`,
            );
        }
        await strategy.validate(userId, eventId);
    }
}
