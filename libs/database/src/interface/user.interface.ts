import { Types } from 'mongoose';

export interface IUser {
    email: string;
    name: string;
    password: string;
    role: string;
    refreshToken?: string;
    deletedAt?: Date;
}

export interface IUserWithId extends IUser {
    _id: Types.ObjectId;
}
