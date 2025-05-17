import { getMongoUri } from '@libs/database/config/db.config';
import { EventSchema } from '@libs/database/schemas/event.schema';
import {
    RewardHistory,
    RewardHistorySchema,
} from '@libs/database/schemas/reward-history.schema';
import { Reward, RewardSchema } from '@libs/database/schemas/reward.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Event } from '../../../libs/database/src/schemas/event.schema';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                uri: getMongoUri({
                    host: config.get<string>('MONGO_HOST')!,
                    port: parseInt(config.get<string>('MONGO_PORT') ?? '27017'),
                    dbName: config.get<string>('MONGO_DB_NAME')!,
                }),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
            { name: Reward.name, schema: RewardSchema },
            { name: RewardHistory.name, schema: RewardHistorySchema },
        ]),
    ],
})
export class EventModule {}
