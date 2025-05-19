import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reward } from './reward.schema';

@Schema()
export class ItemReward extends Reward {
    @Prop({ required: true })
    itemGroupName: string;
}

export const ItemRewardSchema = SchemaFactory.createForClass(ItemReward);
