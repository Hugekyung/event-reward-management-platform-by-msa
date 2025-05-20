import { IUser, IUserWithId } from '@libs/database/interface/user.interface';
import { toUserResponseDto } from '@libs/database/mapper/user.mapper';
import { User, UserDocument } from '@libs/database/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../common/interface/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async existsByEmail(email: string): Promise<boolean> {
        return !!(await this.userModel.exists({ email }));
    }

    async findByEmail(email: string): Promise<IUserWithId | null> {
        const user = await this.userModel.findOne({ email }).lean();
        if (!user) {
            return null;
        }
        return toUserResponseDto(user);
    }

    async findById(id: string): Promise<IUserWithId | null> {
        const user = await this.userModel.findById(id).lean();
        if (!user) {
            return null;
        }
        return toUserResponseDto(user);
    }

    async create(user: IUser): Promise<void> {
        await this.userModel.create(user);
        return;
    }

    async increaseLoginCount(userId: string): Promise<void> {
        await this.userModel.updateOne(
            { _id: userId },
            { $inc: { loginCount: 1 } },
        );
    }
}
