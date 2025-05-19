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
                url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
