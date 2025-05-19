import { CouponRewardSchema } from '@libs/database/schemas/coupon-reward.schema';
import { ItemRewardSchema } from '@libs/database/schemas/item-reward.schema';
import { PointRewardSchema } from '@libs/database/schemas/point-reward.schema';
import {
    RewardHistory,
    RewardHistorySchema,
} from '@libs/database/schemas/reward-history.schema';
import { Reward, RewardSchema } from '@libs/database/schemas/reward.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    RewardHistoryRepositoryToken,
    RewardHistoryServiceToken,
    RewardRepositoryToken,
    RewardServiceToken,
} from '../../common/constants/token.constants';
import { RewardHistoryRepository } from './reward-history.repository';
import { RewardHistoryService } from './reward-history.service';
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
        MongooseModule.forFeature([
            { name: RewardHistory.name, schema: RewardHistorySchema },
        ]),
    ],
    controllers: [RewardController],
    providers: [
        {
            provide: RewardServiceToken,
            useClass: RewardService,
        },
        {
            provide: RewardHistoryServiceToken,
            useClass: RewardHistoryService,
        },
        {
            provide: RewardRepositoryToken,
            useClass: RewardRepository,
        },
        {
            provide: RewardHistoryRepositoryToken,
            useClass: RewardHistoryRepository,
        },
    ],
})
export class RewardModule {}
