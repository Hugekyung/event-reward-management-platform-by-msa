import {
    RedisModule as IoRedisModule,
    RedisModuleOptions,
} from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
    imports: [
        IoRedisModule.forRootAsync({
            useFactory: (config: ConfigService): RedisModuleOptions => ({
                type: 'single',
                url: `redis://${config.get('REDIS_HOST')}:${Number(config.get('REDIS_PORT'))}`,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
