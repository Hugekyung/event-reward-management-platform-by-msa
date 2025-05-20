import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseReward } from '../interface/reward.interface';

export type RewardDocument = Reward & Document;

@Schema({ discriminatorKey: 'type', timestamps: true })
export class Reward implements IBaseReward {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
