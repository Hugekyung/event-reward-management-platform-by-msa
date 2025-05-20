import { getMongoUri } from '@libs/database/config/db.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';
import { EventModule } from './modules/event/event.module';
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
        // MongooseModule.forFeature([
        //     { name: Event.name, schema: EventSchema },
        //     { name: RewardHistory.name, schema: RewardHistorySchema },
        //     { name: EventRewardMapping.name, schema: EventRewardMappingSchema },
        // ]),
        EventModule,
        RewardModule,
    ],
})
export class AppModule {}
