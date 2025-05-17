import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({
        type: Object,
        required: true,
    })
    conditions: {
        type: string;
        detail: string;
    };

    @Prop({ type: [Types.ObjectId], ref: 'Reward' })
    rewards: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
