import { getMongoUri } from '@libs/database/config/db.config';
import { LoggerMiddleware } from '@libs/shared/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
        EventModule,
        RewardModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
