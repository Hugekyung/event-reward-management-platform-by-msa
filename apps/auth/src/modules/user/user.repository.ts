import { IUser, IUserWithId } from '@libs/database/interface/user.interface';
import { toUserResponseDto } from '@libs/database/mapper/user.mapper';
import { User, UserDocument } from '@libs/database/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../common/interface/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async findByEmail(email: string): Promise<IUserWithId> {
        const user = await this.userModel.findOne({ email }).lean();
        if (!user) {
            throw new Error('해당 이메일을 가진 유저 정보가 없습니다.');
        }

        return toUserResponseDto(user);
    }

    async findById(id: string): Promise<IUserWithId> {
        const user = await this.userModel.findById(id).lean();
        if (!user) {
            throw new Error('해당 _id를 가진 유저 정보가 없습니다.');
        }

        return toUserResponseDto(user);
    }

    async create(user: IUser): Promise<void> {
        await this.userModel.create(user);
        return;
    }
}
