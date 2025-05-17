import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
    let service: ProxyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProxyService],
        }).compile();

        service = module.get<ProxyService>(ProxyService);
    });
});
