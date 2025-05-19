import { EventType } from '@libs/enum/event-type.enum';
import { DailyQuestStrategy } from '../../modules/reward/strategy/daily-quest-event.strategy';
import { InviteFriendStrategy } from '../../modules/reward/strategy/invite-event.strategy';
import { Login7DaysStrategy } from '../../modules/reward/strategy/login-event.strategy';
import { ObjectUpgradeStrategy } from '../../modules/reward/strategy/upgrade-event.strategy';
import { IEventConditionStrategy } from './event-condition.strategy';

export class EventConditionContext {
    private static strategyMap: Record<EventType, IEventConditionStrategy> = {
        [EventType.LOGIN_7_DAYS]: new Login7DaysStrategy(),
        [EventType.INVITE_FRIEND]: new InviteFriendStrategy(),
        [EventType.DAILY_QUEST]: new DailyQuestStrategy(),
        [EventType.OBJECT_UPGRADE]: new ObjectUpgradeStrategy(),
    };

    static validate(type: EventType, config: Record<string, any>) {
        const strategy = this.strategyMap[type];
        if (!strategy)
            throw new Error(`지원되지 않는 이벤트 타입입니다: ${type}`);
        strategy.validate(config);
    }
}
