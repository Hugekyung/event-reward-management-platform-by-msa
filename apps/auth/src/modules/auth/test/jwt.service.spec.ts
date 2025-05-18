import { IUserWithId } from '@libs/database/interface/user.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import { IRedisService } from '@libs/redis/redis-service.interface';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '../jwt.service';

jest.mock('jsonwebtoken');

describe('JwtService', () => {
    let jwtService: JwtService;
    let redisService: jest.Mocked<IRedisService>;
    let configService: jest.Mocked<ConfigService>;

    const mockUser: IUserWithId = {
        _id: '1',
        email: 'test@example.com',
        password: 'hashed-password',
        name: '양해찬',
        role: UserRole.USER,
    };

    beforeEach(() => {
        redisService = {
            set: jest.fn(),
            get: jest.fn(),
        } as any;

        configService = {
            get: jest.fn((key: string) => {
                if (key === 'JWT_ACCESS_SECRET') return 'access-secret';
                if (key === 'JWT_REFRESH_SECRET') return 'refresh-secret';
                return null;
            }),
        } as any;

        jwtService = new JwtService(redisService, configService);
    });

    describe('issueTokens', () => {
        it('accessToken과 refreshToken을 모두 신규 발급한다', () => {
            const signMock = jwt.sign as jest.Mock;
            signMock
                .mockReturnValueOnce('access-token')
                .mockReturnValueOnce('refresh-token');

            const tokens = jwtService.issueTokens(mockUser);

            expect(tokens.accessToken).toBe('access-token');
            expect(tokens.refreshToken).toBe('refresh-token');
            expect(signMock).toHaveBeenCalledTimes(2);
        });
    });

    describe('verify', () => {
        it('토큰을 검증하고 payload를 반환한다', () => {
            const mockPayload = { sub: mockUser._id, role: mockUser.role };
            (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

            const result = jwtService.verify('access-token');

            expect(result).toEqual(mockPayload);
            expect(jwt.verify).toHaveBeenCalledWith(
                'access-token',
                'access-secret',
            );
        });
    });

    describe('storeRefreshToken', () => {
        it('Redis에 refresh 토큰을 저장한다', async () => {
            await jwtService.storeRefreshToken('1', 'refresh-token');
            expect(redisService.set).toHaveBeenCalledWith(
                'refresh:1',
                'refresh-token',
                { EX: 60 * 60 * 24 * 7 },
            );
        });
    });

    describe('validateRefreshToken', () => {
        it('Redis에 저장된 토큰과 일치하면 통과한다', async () => {
            redisService.get.mockResolvedValue('refresh-token');

            const result = await jwtService.validateRefreshToken(
                '1',
                'refresh-token',
            );

            expect(result).resolves.toBeUndefined();
        });

        it('Redis에 저장된 토큰과 다르면 UnauthorizedException가 발생한다', async () => {
            redisService.get.mockResolvedValue('another-token');

            const result = await jwtService.validateRefreshToken(
                '1',
                'wrong-token',
            );

            expect(result).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('verifyRefreshToken', () => {
        it('refresh 토큰을 검증하고 payload를 반환한다', () => {
            const mockPayload = { sub: mockUser._id };
            (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

            const result = jwtService.verifyRefreshToken('refresh-token');

            expect(result).toEqual(mockPayload);
            expect(jwt.verify).toHaveBeenCalledWith(
                'refresh-token',
                'refresh-secret',
            );
        });
    });
});
