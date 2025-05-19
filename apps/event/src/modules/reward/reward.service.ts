import {
    IReward,
    IRewardWithId,
} from '@libs/database/interface/reward.interface';
import { EventType } from '@libs/enum/event-type.enum';
import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    EventRepositoryToken,
    EventRewardMappingRepositoryToken,
    RewardHistoryRepositoryToken,
    RewardRepositoryToken,
} from '../../common/constants/token.constants';
import { IEventRepository } from '../../common/interface/event-repository.interface';
import { IEventRewardMappingRepository } from '../../common/interface/event-reward-mapping-repository.interface';
import { IRewardHistoryRepository } from '../../common/interface/reward-history-repository.interface';
import { IRewardRepository } from '../../common/interface/reward-repository.interface';
import { IRewardService } from '../../common/interface/reward-service.interface';
import { EventConditionContext } from '../../common/strategy/event-condition-context';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardHistoryFactory } from './factory/reward-history.factory';
import { RewardFactory } from './factory/reward.factory';

@Injectable()
export class RewardService implements IRewardService {
    constructor(
        @Inject(RewardRepositoryToken)
        private readonly rewardRepository: IRewardRepository,
        @Inject(EventRepositoryToken)
        private readonly eventRepository: IEventRepository,
        @Inject(RewardHistoryRepositoryToken)
        private readonly rewardHistoryRepository: IRewardHistoryRepository,
        @Inject(EventRewardMappingRepositoryToken)
        private readonly eventRewardMappingRepository: IEventRewardMappingRepository,
    ) {}

    async createReward(dto: CreateRewardDto): Promise<IRewardWithId> {
        const reward: IReward = RewardFactory.createRewardObject(dto);
        return await this.rewardRepository.create(dto.type, reward);
    }

    async findAllRewards(): Promise<IRewardWithId[]> {
        return await this.rewardRepository.findAll();
    }

    async findRewardById(rewardId: string): Promise<IRewardWithId | null> {
        return await this.rewardRepository.findById(rewardId);
    }

    async requestReward(
        userId: string,
        eventId: string,
        type: EventType,
    ): Promise<void> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new NotFoundException('이벤트를 찾을 수 없습니다.');
        }

        const config = event.conditions?.config;
        if (!config) {
            throw new BadRequestException('이벤트 조건 설정이 없습니다.');
        }

        // * 조건 검증 + 실패 기록
        try {
            EventConditionContext.validate(type, config);
        } catch (err) {
            const rewardHistoryObject = RewardHistoryFactory.createFailure(
                userId,
                eventId,
                err.message,
            );
            await this.rewardHistoryRepository.create(rewardHistoryObject);
            throw err;
        }

        // * 보상 조회
        const reward = await this.rewardRepository.findByEventId(eventId);
        if (!reward) {
            const reason = '이벤트에 연결된 보상이 없습니다.';
            const rewardHistoryObject = RewardHistoryFactory.createFailure(
                userId,
                eventId,
                reason,
            );
            await this.rewardHistoryRepository.create(rewardHistoryObject);
            throw new NotFoundException(
                '해당 이벤트에 연결된 보상이 없습니다.',
            );
        }

        // * 보상 히스토리 저장
        const rewardHistoryObject = RewardHistoryFactory.createSuccess(
            userId,
            eventId,
            reward._id.toString(), // ! id 타입 일치시키기
        );
        await this.rewardHistoryRepository.create(rewardHistoryObject);

        // * 보상 수량 증가
        await this.eventRewardMappingRepository.increaseQuantity(
            eventId,
            reward._id.toString(), // ! id 타입 일치시키기
        );

        // ! return 추가하기
    }
}
