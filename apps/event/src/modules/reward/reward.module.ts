import { CouponRewardSchema } from '@libs/database/schemas/coupon-reward.schema';
import { ItemRewardSchema } from '@libs/database/schemas/item-reward.schema';
import { PointRewardSchema } from '@libs/database/schemas/point-reward.schema';
import { Reward, RewardSchema } from '@libs/database/schemas/reward.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    RewardRepositoryToken,
    RewardServiceToken,
} from '../../common/constants/token.constants';
import { RewardController } from './reward.controller';
import { RewardRepository } from './reward.repository';
import { RewardService } from './reward.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Reward.name,
                useFactory: () => {
                    const schema = RewardSchema;
                    schema.discriminator('POINT', PointRewardSchema);
                    schema.discriminator('ITEM', ItemRewardSchema);
                    schema.discriminator('COUPON', CouponRewardSchema);
                    return schema;
                },
            },
        ]),
    ],
    controllers: [RewardController],
    providers: [
        RewardService,
        {
            provide: RewardServiceToken,
            useClass: RewardService,
        },
        {
            provide: RewardRepositoryToken,
            useClass: RewardRepository,
        },
    ],
})
export class RewardModule {}
