import { RewardHistoryStatus } from '@libs/enum/reward-history-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IRewardHistory } from '../interface/reward-history.interface';

export type RewardHistoryDocument = RewardHistory & Document;

@Schema({ timestamps: true })
export class RewardHistory implements IRewardHistory {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Event' })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Reward' })
    rewardId: Types.ObjectId;

    @Prop({ enum: ['SUCCESS', 'FAILED'] })
    status: RewardHistoryStatus;

    @Prop()
    reason?: string;
}

export const RewardHistorySchema = SchemaFactory.createForClass(RewardHistory);
RewardHistorySchema.index(
    { userId: 1, eventId: 1, rewardId: 1 },
    { unique: true },
);
