import { RedisKeyPrefix } from '@libs/enum/redis-key-prefix.enum';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';

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
        ttl: number = 60 * 60 * 24 * 7,
    ): Promise<void> {
        await this.redis.set(prefix + key, JSON.stringify(value), 'EX', ttl);
    }

    async setIfNotExists(
        key: string,
        value: string,
        ttl: number,
    ): Promise<boolean> {
        const result = await this.redis.set(
            key,
            value,
            ...(['NX', 'EX', ttl] as any[]),
        );
        return result === 'OK';
    }

    async del(prefix: RedisKeyPrefix, key: string): Promise<void> {
        await this.redis.del(prefix + key);
    }

    async delRaw(fullKey: string): Promise<void> {
        await this.redis.del(fullKey);
    }
}
