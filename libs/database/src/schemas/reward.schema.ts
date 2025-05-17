import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
    @Prop({ enum: ['POINT', 'ITEM', 'COUPON', 'CURRENCY'] })
    type: string;

    @Prop()
    name: string;

    @Prop()
    amount?: number;

    @Prop({ type: Object })
    metadata?: Record<string, any>;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
