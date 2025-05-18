import { IUser } from '@libs/database/interface/user.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { IJwtService } from '../../common/interface/jwt-service.interface';

@Injectable()
export class JwtService implements IJwtService {
    constructor() {}

    sign(payload: object, options?: jwt.SignOptions): string {
        return jwt.sign(payload, process.env.JWT_SECRET!, options);
    }

    verify(
        token: string,
        options?: jwt.VerifyOptions & { secret?: string },
    ): JwtPayload {
        const secret = options?.secret || process.env.JWT_SECRET!;
        return jwt.verify(token, secret) as JwtPayload;
    }

    issueTokens(user: IUser): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign(
            { sub: user.id, role: user.role },
            { expiresIn: '15m' },
        );

        const refreshToken = jwt.sign(
            { sub: user.id },
            { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET },
        );

        return { accessToken, refreshToken };
    }

    async storeRefreshToken(userId: string, token: string): Promise<void> {
        await this.redis.set(`refresh:${userId}`, token, {
            EX: 60 * 60 * 24 * 7,
        });
    }

    verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
    }

    async validateRefreshToken(
        userId: string,
        givenToken: string,
    ): Promise<void> {
        const stored = await this.redis.get(`refresh:${userId}`);
        if (stored !== givenToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
