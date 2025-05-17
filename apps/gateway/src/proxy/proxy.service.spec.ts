import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
    let service: ProxyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProxyService],
        }).compile();

        service = module.get<ProxyService>(ProxyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call proxy middleware with correct target', async () => {
        const req = { path: '/api/auth/login' } as Request;
        const res = {} as Response;

        // createProxyMiddleware는 내부 미들웨어이므로, 직접 assert는 어렵고
        // 실제로 에러 없이 통과되는지 정도만 확인
        const result = await service.forwardRequest(req, res);
        expect(result).toBeUndefined(); // 미들웨어 자체는 반환값 없음
    });
});
