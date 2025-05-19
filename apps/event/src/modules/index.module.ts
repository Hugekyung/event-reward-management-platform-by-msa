import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';

@Module({
    imports: [RewardModule, EventModule],
})
export class IndexModule {}
