import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardHistoryDocument = RewardHistory & Document;

@Schema({ timestamps: true })
export class RewardHistory {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Event' })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Reward' })
    rewardId: Types.ObjectId;

    @Prop({ enum: ['SUCCESS', 'FAILED'] })
    status: 'SUCCESS' | 'FAILED';

    @Prop()
    reason?: string;

    @Prop()
    idempotencyKey?: string;
}

export const RewardHistorySchema = SchemaFactory.createForClass(RewardHistory);
RewardHistorySchema.index(
    { userId: 1, eventId: 1, rewardId: 1 },
    { unique: true },
);
