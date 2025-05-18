import { Test, TestingModule } from '@nestjs/testing';
import { RewardHistoryService } from '../reward-history.service';

describe('RewardHistoryService', () => {
    let service: RewardHistoryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RewardHistoryService],
        }).compile();

        service = module.get<RewardHistoryService>(RewardHistoryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
