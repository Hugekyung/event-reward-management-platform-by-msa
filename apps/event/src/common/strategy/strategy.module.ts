import { EventType } from '@libs/enum/event-type.enum';
import { Module } from '@nestjs/common';
import { EventConditionStrategyTokenMap } from '../constants/token.constants';
import { EventConditionContext } from './event-condition-context';
import { AttendanceStrategy } from './login-event.strategy';

@Module({
    providers: [
        AttendanceStrategy,
        {
            provide: EventConditionStrategyTokenMap,
            useFactory: (attendanceStrategy: AttendanceStrategy) => ({
                [EventType.LOGIN_FIRST_TIME]: attendanceStrategy,
                // [EventType.DAILY_QUEST]: questStrategy,
            }),
            inject: [AttendanceStrategy], // 다른 전략들...
        },
        EventConditionContext,
    ],
    exports: [EventConditionContext],
})
export class StrategyModule {}
