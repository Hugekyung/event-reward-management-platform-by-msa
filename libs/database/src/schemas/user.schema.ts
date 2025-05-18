import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interface/user.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User implements IUser {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    name: string;

    @Prop({ enum: ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'], default: 'USER' })
    role: string;

    @Prop()
    refreshToken?: string;

    @Prop()
    deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
