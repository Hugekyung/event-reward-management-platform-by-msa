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
                url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REDIS_PORT ?? 6379}`,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
