import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RedisInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 예시: Redis 연결 확인 로그 출력
        const req = context.switchToHttp().getRequest();
        console.log(`[RedisInterceptor] 요청 경로: ${req.path}`);
        return next.handle();
    }
}
