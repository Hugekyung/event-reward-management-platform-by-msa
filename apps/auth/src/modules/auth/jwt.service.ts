import { IUserWithId } from '@libs/database/interface/user.interface';
import { IRedisService } from '@libs/redis/redis-service.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { RedisServiceToken } from '../../common/constants/token.constants';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { IJwtService } from '../../common/interface/jwt-service.interface';

@Injectable()
export class JwtService implements IJwtService {
    private readonly accessSecret: string;
    private readonly refreshSecret: string;
    private readonly refreshTTL = 60 * 60 * 24 * 7; // 7일
    constructor(
        @Inject(RedisServiceToken)
        private readonly redis: IRedisService,
        private readonly config: ConfigService,
    ) {
        this.accessSecret = this.config.get<string>('JWT_ACCESS_SECRET')!;
        this.refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET')!;
    }

    verify(
        token: string,
        options?: jwt.VerifyOptions & { secret?: string },
    ): JwtPayload {
        const secret = options?.secret || this.accessSecret;
        return jwt.verify(token, secret) as JwtPayload;
    }

    issueTokens(user: IUserWithId): {
        accessToken: string;
        refreshToken: string;
    } {
        const accessToken = jwt.sign(
            { sub: user._id, role: user.role },
            this.accessSecret,
            { expiresIn: '15m' },
        );

        const refreshToken = jwt.sign({ sub: user._id }, this.refreshSecret, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    async storeRefreshToken(
        userId: Types.ObjectId,
        token: string,
    ): Promise<void> {
        await this.redis.set(`refresh:${userId}`, token, {
            EX: this.refreshTTL,
        });
    }

    verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, this.refreshSecret) as JwtPayload;
    }

    async validateRefreshToken(
        userId: string,
        givenToken: string,
    ): Promise<void> {
        const storedRefreshToken = await this.redis.get(`refresh:${userId}`);
        if (storedRefreshToken !== givenToken) {
            throw new UnauthorizedException(
                '유효하지 않은 Refresh 토큰입니다.',
            );
        }
    }
}
