import { JwtPayload } from '@libs/shared/interface/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly config: ConfigService) {
        const jwtSecret = config.get<string>('JWT_ACCESS_SECRET')!;
        if (!jwtSecret) {
            throw new Error('JWT_ACCESS_SECRET 데이터가 없습니다!');
        }
        super({
            secretOrKey: jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    validate(payload: JwtPayload): JwtPayload {
        return payload;
    }
}
