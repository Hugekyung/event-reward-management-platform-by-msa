import { UserRole } from '@libs/enum/user-role.enum';
import { JwtPayload } from '@libs/shared/interface/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../jwt.strategy';

describe('JwtStrategy', () => {
    let strategy: JwtStrategy;

    beforeEach(() => {
        const config = new ConfigService();
        process.env.JWT_SECRET = 'test-secret';
        strategy = new JwtStrategy(config);
    });

    it('JwtStrategy가 수행되면 jwtPayload가 반환된다', () => {
        const payload: JwtPayload = {
            sub: '1',
            email: 'test@example.com',
            role: UserRole.USER,
        };

        const result = strategy.validate(payload);
        expect(result).toEqual(payload);
    });
});
