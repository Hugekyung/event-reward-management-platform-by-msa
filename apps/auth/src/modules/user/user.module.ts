import { User, UserSchema } from '@libs/database/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    UserRepositoryToken,
    UserServiceToken,
} from '../../common/constants/token.constants';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: UserServiceToken,
            useClass: UserService,
        },
        {
            provide: UserRepositoryToken,
            useClass: UserRepository,
        },
    ],
})
export class UserModule {}
