import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reward } from './reward.schema';

@Schema()
export class CouponReward extends Reward {
    @Prop({ required: true })
    discountAmount: number; // 할인 금액 (예: 5000)

    @Prop({ required: true })
    minimumOrderPrice: number; // 적용 가능한 최소 주문 금액 (예: 10000)
}

export const CouponRewardSchema = SchemaFactory.createForClass(CouponReward);
