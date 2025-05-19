import { UserSchema } from '@libs/database/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryToken } from '../../common/constants/token.constants';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: UserRepositoryToken,
            useClass: UserRepository,
        },
    ],
})
export class UserModule {}
