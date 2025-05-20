import {
    EventRewardMapping,
    EventRewardMappingSchema,
} from '@libs/database/schemas/event-reward-mapping.schema';
import { Event, EventSchema } from '@libs/database/schemas/event.schema';
import { ItemRewardSchema } from '@libs/database/schemas/item-reward.schema';
import { PointRewardSchema } from '@libs/database/schemas/point-reward.schema';
import {
    RewardHistory,
    RewardHistorySchema,
} from '@libs/database/schemas/reward-history.schema';
import { Reward, RewardSchema } from '@libs/database/schemas/reward.schema';
import { RedisModule } from '@libs/redis';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../common/auth/jwt.strategy';
import {
    EventRepositoryToken,
    EventRewardMappingRepositoryToken,
    RewardHistoryRepositoryToken,
    RewardHistoryServiceToken,
    RewardRepositoryToken,
    RewardServiceToken,
} from '../../common/constants/token.constants';
import { StrategyModule } from '../../common/strategy/strategy.module';
import { EventRepository } from '../event/event.repository';
import { EventRewardMappingRepository } from './event-reward-mapping.repository';
import { RewardHistoryRepository } from './reward-history.repository';
import { RewardHistoryService } from './reward-history.service';
import { RewardController } from './reward.controller';
import { RewardRepository } from './reward.repository';
import { RewardService } from './reward.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                baseURL: config.get<string>('AUTH_SERVER_URL'),
                timeout: 3000,
            }),
        }),
        MongooseModule.forFeatureAsync([
            {
                name: Reward.name,
                useFactory: () => {
                    const schema = RewardSchema;
                    schema.discriminator('POINT', PointRewardSchema);
                    schema.discriminator('ITEM', ItemRewardSchema);
                    return schema;
                },
            },
        ]),
        MongooseModule.forFeature([
            { name: RewardHistory.name, schema: RewardHistorySchema },
            { name: Event.name, schema: EventSchema },
            { name: EventRewardMapping.name, schema: EventRewardMappingSchema },
        ]),
        StrategyModule,
        RedisModule,
    ],
    controllers: [RewardController],
    providers: [
        {
            provide: RewardServiceToken,
            useClass: RewardService,
        },
        {
            provide: RewardHistoryServiceToken,
            useClass: RewardHistoryService,
        },
        {
            provide: RewardRepositoryToken,
            useClass: RewardRepository,
        },
        {
            provide: RewardHistoryRepositoryToken,
            useClass: RewardHistoryRepository,
        },
        {
            provide: EventRepositoryToken,
            useClass: EventRepository,
        },
        {
            provide: EventRewardMappingRepositoryToken,
            useClass: EventRewardMappingRepository,
        },
        JwtStrategy,
    ],
})
export class RewardModule {}
