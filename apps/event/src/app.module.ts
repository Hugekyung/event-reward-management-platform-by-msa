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
import { resolve } from 'path';
import { Event } from '../../../libs/database/src/schemas/event.schema';
import { EventModule } from './modules/event/event.module';
import { RewardHistoryService } from './modules/reward/reward-history.service';
import { RewardModule } from './modules/reward/reward.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: resolve(process.cwd(), 'apps/event/.env'),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                const uri = getMongoUri({
                    host: config.get('MONGO_HOST'),
                    port: parseInt(config.get('MONGO_PORT')!),
                    dbName: config.get('MONGO_DB_NAME')!,
                });
                console.log('📦 Mongo URI:', uri);
                return { uri };
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
            { name: Reward.name, schema: RewardSchema },
            { name: RewardHistory.name, schema: RewardHistorySchema },
        ]),
        EventModule,
        RewardModule,
    ],
    providers: [RewardHistoryService],
})
export class AppModule {}
