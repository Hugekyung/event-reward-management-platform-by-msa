import { RewardType } from '@libs/enum/reward-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ discriminatorKey: 'type', timestamps: true })
export class Reward {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, enum: RewardType })
    type: RewardType;

    @Prop({ required: true })
    description: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
