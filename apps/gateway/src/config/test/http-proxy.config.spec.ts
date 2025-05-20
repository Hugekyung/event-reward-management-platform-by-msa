import { mappingRoute } from '../http-proxy.config';

describe('mappingRoute 함수 테스트', () => {
    it('/api/auth/* 경로는 Auth 서버 주소를 반환해야 한다', () => {
        expect(mappingRoute('/api/auth/login')?.target).toBe(
            'http://auth:3001',
        );
        expect(mappingRoute('/api/users/register')?.target).toBe(
            'http://auth:3001',
        );
    });

    it('/api/events/* 또는 /api/rewards/* 경로는 Event 서버 주소를 반환해야 한다', () => {
        expect(mappingRoute('/api/events/list')?.target).toBe(
            'http://event:3002',
        );
        expect(mappingRoute('/api/rewards/create')?.target).toBe(
            'http://event:3002',
        );
    });

    it('정의되지 않은 경로는 undefined를 반환해야 한다', () => {
        expect(mappingRoute('/api/unknown')).toBeUndefined();
    });
});
