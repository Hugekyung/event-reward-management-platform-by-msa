import { mappingTargetAPI } from '../http-proxy.config';

describe('mappingTargetAPI', () => {
    it('/api/auth/* 주소로 API를 요청하면 Auth-Server 요청 url를 반환한다', () => {
        expect(mappingTargetAPI('/api/auth/login')).toBe('http://auth:3001');
    });

    it('/api/event/* 주소로 API를 요청하면 Event-Server 요청 url를 반환한다', () => {
        expect(mappingTargetAPI('/api/event/list')).toBe('http://event:3002');
    });

    it('auth/event가 아닌 주소의 API 요청은 default url을 반환한다', () => {
        expect(mappingTargetAPI('/api/unknown')).toBe('http://default');
    });
});
