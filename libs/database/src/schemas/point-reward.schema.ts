import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reward } from './reward.schema';

@Schema()
export class PointReward extends Reward {
    @Prop({ required: true })
    amount: number;
}

export const PointRewardSchema = SchemaFactory.createForClass(PointReward);
