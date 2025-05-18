import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

export enum RedisKeyPrefix {
    REFRESH = 'refresh:',
}

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async get<T = any>(prefix: RedisKeyPrefix, key: string): Promise<T | null> {
        const raw = await this.redis.get(prefix + key);
        return raw ? JSON.parse(raw) : null;
    }

    async set(
        prefix: RedisKeyPrefix,
        key: string,
        value: any,
        ttl: number = 60 * 60 * 24 * 7, // 기본 7일
    ): Promise<void> {
        await this.redis.set(prefix + key, JSON.stringify(value), 'EX', ttl);
    }

    async del(prefix: RedisKeyPrefix, key: string): Promise<void> {
        await this.redis.del(prefix + key);
    }
}
