import { RedisKeyPrefix } from '@libs/enum/redis-key-prefix.enum';
import { RedisService } from '@libs/redis/redis.service';
import {
    CallHandler,
    ConflictException,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RewardIdempotencyInterceptor implements NestInterceptor {
    constructor(private readonly redisService: RedisService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user || !user.sub) {
            throw new ConflictException('유저 정보가 없습니다.');
        }

        // * 요청에서 이벤트 ID, 보상 ID 추출 (body 기반)
        const eventId: string = req.body?.eventId;
        if (!eventId) {
            throw new ConflictException('이벤트 ID가 누락되었습니다.');
        }

        const key = `${RedisKeyPrefix.IDEMPOTENCY}:reward:${user.id}:${eventId}`;

        // * 멱등키 체크
        const isAlreadyRequested = await this.redisService.setIfNotExists(
            key,
            'PENDING',
            60,
        );
        if (!isAlreadyRequested) {
            throw new ConflictException(
                '이미 보상 처리 중이거나 완료되었습니다.',
            );
        }

        return next.handle().pipe(
            tap({
                next: async () => {
                    await this.redisService.delRaw(key);
                },
                error: async () => {
                    await this.redisService.delRaw(key);
                },
            }),
        );
    }
}
