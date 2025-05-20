import { EventType } from '@libs/enum/event-type.enum';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
    EventRepositoryToken,
    EventRewardMappingRepositoryToken,
    RewardHistoryRepositoryToken,
    RewardRepositoryToken,
} from '../../../common/constants/token.constants';
import { EventConditionContext } from '../../../common/strategy/event-condition-context';
import { RewardHistoryFactory } from '../factory/reward-history.factory';
import { RewardService } from '../reward.service';

describe('RewardService - requestReward', () => {
    let service: RewardService;

    const mockEvent = {
        _id: 'event-id',
        name: '테스트 이벤트',
        conditions: {
            type: EventType.LOGIN_FIRST_TIME,
            config: { targetCount: 1 },
        },
    };

    const mockReward = {
        _id: 'reward-id',
        name: '100포인트',
    };

    const mockRewardRepository = {};
    const mockEventRepository = {
        findById: jest.fn(),
    };
    const mockHistoryRepository = {
        exists: jest.fn(),
        create: jest.fn(),
    };
    const mockMappingRepository = {
        findRewardByEventId: jest.fn(),
        increaseQuantity: jest.fn(),
    };
    const mockConditionContext = {
        validate: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RewardService,
                {
                    provide: RewardRepositoryToken,
                    useValue: mockRewardRepository,
                },
                {
                    provide: EventRepositoryToken,
                    useValue: mockEventRepository,
                },
                {
                    provide: RewardHistoryRepositoryToken,
                    useValue: mockHistoryRepository,
                },
                {
                    provide: EventRewardMappingRepositoryToken,
                    useValue: mockMappingRepository,
                },
                {
                    provide: EventConditionContext,
                    useValue: mockConditionContext,
                },
            ],
        }).compile();

        service = module.get<RewardService>(RewardService);
    });

    it('✅ 이벤트가 존재하지 않으면 NotFoundException을 던진다', async () => {
        mockEventRepository.findById.mockResolvedValue(null);

        await expect(
            service.requestReward(
                'user1',
                'invalid-event',
                EventType.LOGIN_FIRST_TIME,
            ),
        ).rejects.toThrow(NotFoundException);
    });

    it('✅ 이미 보상을 받았다면 ConflictException을 던진다', async () => {
        mockEventRepository.findById.mockResolvedValue(mockEvent);
        mockHistoryRepository.exists.mockResolvedValue(true);

        await expect(
            service.requestReward(
                'user1',
                'event-id',
                EventType.LOGIN_FIRST_TIME,
            ),
        ).rejects.toThrow(ConflictException);
    });

    it('✅ 조건 검증 실패 시 실패 히스토리를 남기고 예외를 던진다', async () => {
        mockEventRepository.findById.mockResolvedValue(mockEvent);
        mockHistoryRepository.exists.mockResolvedValue(false);
        mockConditionContext.validate.mockRejectedValue(
            new Error('조건 불충족'),
        );

        await expect(
            service.requestReward(
                'user1',
                'event-id',
                EventType.LOGIN_FIRST_TIME,
            ),
        ).rejects.toThrow('조건 불충족');

        expect(mockHistoryRepository.create).toHaveBeenCalledWith(
            RewardHistoryFactory.createFailure(
                'user1',
                'event-id',
                '조건 불충족',
            ),
        );
    });

    it('✅ 정상 요청 시 히스토리 저장 및 수량 증가가 수행된다', async () => {
        mockEventRepository.findById.mockResolvedValue(mockEvent);
        mockHistoryRepository.exists.mockResolvedValue(false);
        mockConditionContext.validate.mockResolvedValue(true);
        mockMappingRepository.findRewardByEventId.mockResolvedValue(mockReward);

        const result = await service.requestReward(
            'user1',
            'event-id',
            EventType.DAILY_QUEST,
        );

        expect(mockHistoryRepository.create).toHaveBeenCalledWith(
            RewardHistoryFactory.createSuccess(
                'user1',
                'event-id',
                'reward-id',
            ),
        );
        expect(mockMappingRepository.increaseQuantity).toHaveBeenCalledWith(
            'event-id',
            'reward-id',
        );
        expect(result.message).toContain('요청 및 지급이 완료');
    });
});
