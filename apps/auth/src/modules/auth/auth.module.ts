import { User, UserSchema } from '@libs/database/schemas/user.schema';
import { RedisModule, RedisService } from '@libs/redis';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    AuthServiceToken,
    JwtServiceToken,
    RedisServiceToken,
    UserRepositoryToken,
} from '../../common/constants/token.constants';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        RedisModule,
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthServiceToken,
            useClass: AuthService,
        },
        {
            provide: RedisServiceToken,
            useClass: RedisService,
        },
        {
            provide: JwtServiceToken,
            useClass: JwtService,
        },
        {
            provide: UserRepositoryToken,
            useClass: UserRepository,
        },
    ],
})
export class AuthModule {}
