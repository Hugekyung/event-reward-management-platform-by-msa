import { EventType } from '@libs/enum/event-type.enum';
import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';
import { DailyQuestStrategy } from './daily-quest-event.strategy';
import { InviteFriendStrategy } from './invite-event.strategy';
import { AttendanceStrategy } from './login-event.strategy';
import { ObjectUpgradeStrategy } from './upgrade-event.strategy';

export class EventConditionContext {
    private static strategyMap: Record<EventType, IEventConditionStrategy> = {
        [EventType.ATTENDANCE]: new AttendanceStrategy(),
        [EventType.INVITE]: new InviteFriendStrategy(),
        [EventType.QUEST]: new DailyQuestStrategy(),
        [EventType.UPGRADE]: new ObjectUpgradeStrategy(),
    };

    static validate(type: EventType, config: Record<string, any>) {
        const strategy = this.strategyMap[type];
        if (!strategy)
            throw new BadRequestException(
                `지원되지 않는 이벤트 타입입니다: ${type}`,
            );
        strategy.validate(config);
    }
}
