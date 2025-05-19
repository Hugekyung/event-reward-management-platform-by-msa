import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class EventRewardMapping {
    @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Reward', required: true })
    rewardId: Types.ObjectId;

    @Prop({ required: true })
    quantity: number;
}

export const EventRewardMappingSchema =
    SchemaFactory.createForClass(EventRewardMapping);
