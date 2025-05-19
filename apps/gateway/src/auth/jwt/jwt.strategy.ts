import { JwtPayload } from '@libs/shared/interface/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly config: ConfigService) {
        const jwtSecret = config.get<string>('USER_JWT_SECRET')!;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined in config!');
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
