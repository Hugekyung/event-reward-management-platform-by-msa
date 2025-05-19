import { IReward } from '@libs/database/interface/reward.interface';
import { CreateRewardDto } from '../../modules/reward/dto/create-reward.dto';

export interface IRewardFactory {
    create(dto: CreateRewardDto): IReward;
}
