import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RewardHistoryRepositoryToken } from '../constants/token.constants';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';
import { IRewardHistoryRepository } from '../interface/reward-history-repository.interface';

@Injectable()
export class AttendanceStrategy implements IEventConditionStrategy {
    constructor(
        private readonly httpService: HttpService,
        @Inject(RewardHistoryRepositoryToken)
        private readonly rewardHistoryRepository: IRewardHistoryRepository,
    ) {}

    async validate(userId: string, eventId: string): Promise<void> {
        try {
            // ! 타입 다른 파일로 빼기
            // * 로그인 여부
            const { data }: { data: { ok: boolean } } = await firstValueFrom(
                this.httpService.get(`/users/${userId}/attendance-check`),
            );
            if (!data.ok) {
                throw new BadRequestException(
                    '첫 로그인한 유저만 보상 받을 수 있어요.',
                );
            }

            // * 이미 지급 받았는지 여부
            const alreadyRewarded = await this.rewardHistoryRepository.exists(
                userId,
                eventId,
            );
            if (alreadyRewarded) {
                throw new BadRequestException(
                    '이미 해당 이벤트에 대한 보상을 수령하였습니다.',
                );
            }
        } catch (err) {
            throw new BadRequestException('유저 상태 확인에 실패했습니다.');
        }
    }
}
