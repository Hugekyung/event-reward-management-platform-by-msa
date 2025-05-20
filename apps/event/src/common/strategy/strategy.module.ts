import {
    RewardHistory,
    RewardHistorySchema,
} from '@libs/database/schemas/reward-history.schema';
import { EventType } from '@libs/enum/event-type.enum';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardHistoryRepository } from '../../modules/reward/reward-history.repository';
import {
    EventConditionStrategyTokenMap,
    RewardHistoryRepositoryToken,
} from '../constants/token.constants';
import { EventConditionContext } from './event-condition-context';
import { AttendanceStrategy } from './login-event.strategy';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            { name: RewardHistory.name, schema: RewardHistorySchema },
        ]),
    ],
    providers: [
        AttendanceStrategy,
        {
            provide: EventConditionStrategyTokenMap,
            useFactory: (attendanceStrategy: AttendanceStrategy) => ({
                [EventType.LOGIN_FIRST_TIME]: attendanceStrategy,
            }),
            inject: [AttendanceStrategy],
        },
        EventConditionContext,
        {
            provide: RewardHistoryRepositoryToken,
            useClass: RewardHistoryRepository,
        },
    ],
    exports: [EventConditionContext],
})
export class StrategyModule {}
