import { RedisModule, RedisService } from '@libs/redis';
import { Module } from '@nestjs/common';
import { RedisServiceToken } from '../../common/constants/token.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
    imports: [RedisModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtService,
        {
            provide: RedisServiceToken,
            useClass: RedisService,
        },
    ],
})
export class AuthModule {}
