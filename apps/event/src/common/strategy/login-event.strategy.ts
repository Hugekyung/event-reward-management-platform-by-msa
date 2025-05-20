import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
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
            console.log('AttendanceStrategy 내부', userId); //debug
            // ! 타입 다른 파일로 빼기
            // * 로그인 여부
            const { data } = await axios.get<{ ok: boolean }>(
                `http://localhost:3001/users/${userId}/attendance-check`, // ! env로 빼기(localhost:3001 => auth:3001)
            );
            console.log('Auth 서버로부터 받은 데이터 >>', data); //debug
            if (!data.ok) {
                throw new BadRequestException(
                    '첫 로그인한 유저만 보상 받을 수 있어요.',
                );
            }
        } catch (err) {
            throw new BadRequestException('유저 상태 확인에 실패했습니다.');
        }
    }
}
