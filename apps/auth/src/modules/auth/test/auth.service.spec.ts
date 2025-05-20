import { UserRole } from '@libs/enum/user-role.enum';
import { UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { IJwtService } from '../../../common/interface/jwt-service.interface';
import { IUserRepository } from '../../../common/interface/user-repository.interface';
import { PasswordUtil } from '../../../common/utils/password.util';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

jest.mock('../../../common/utils/password.util');

describe('AuthService', () => {
    let authService: AuthService;
    let userRepository: jest.Mocked<IUserRepository>;
    let jwtService: jest.Mocked<IJwtService>;

    const mockUser = {
        _id: new Types.ObjectId(),
        email: 'test@example.com',
        password: 'hashed-password',
        name: '양해찬',
        role: UserRole.USER,
    };

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            existsByEmail: jest.fn(),
            increaseLoginCount: jest.fn(),
        } as any;

        jwtService = {
            issueTokens: jest.fn(),
            storeRefreshToken: jest.fn(),
            verifyRefreshToken: jest.fn(),
            validateRefreshToken: jest.fn(),
        } as any;

        authService = new AuthService(
            undefined as any,
            userRepository,
            jwtService,
        );
    });

    describe('login', () => {
        it('비밀번호가 틀리면 UnauthorizedException을 던진다', async () => {
            userRepository.findByEmail.mockResolvedValue(mockUser);
            (PasswordUtil.verify as jest.Mock).mockResolvedValue(false);

            const dto: LoginUserDto = {
                email: mockUser.email,
                password: 'wrong',
            };

            await expect(authService.login(dto)).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('로그인 성공 시 토큰을 발급하고 저장한다', async () => {
            userRepository.findByEmail.mockResolvedValue(mockUser);
            (PasswordUtil.verify as jest.Mock).mockResolvedValue(true);
            jwtService.issueTokens.mockReturnValue({
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            });

            const dto: LoginUserDto = {
                email: mockUser.email,
                password: 'correct',
            };

            const result = await authService.login(dto);

            expect(jwtService.issueTokens).toHaveBeenCalledWith(mockUser);
            expect(jwtService.storeRefreshToken).toHaveBeenCalledWith(
                mockUser._id,
                'refresh-token',
            );
            expect(result.accessToken).toBe('access-token');
        });
    });

    describe('refreshToken', () => {
        it('유효하지 않은 refreshToken이면 UnauthorizedException을 던진다', async () => {
            jwtService.verifyRefreshToken.mockImplementation(() => {
                throw new UnauthorizedException();
            });

            await expect(authService.refreshToken('invalid')).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('refreshToken이 유효하면 새로운 토큰을 발급한다', async () => {
            jwtService.verifyRefreshToken.mockReturnValue({
                sub: mockUser._id.toString(),
                email: mockUser.email,
                role: mockUser.role,
            });

            jwtService.validateRefreshToken.mockResolvedValue();
            userRepository.findById.mockResolvedValue(mockUser);
            jwtService.issueTokens.mockReturnValue({
                accessToken: 'new-access',
                refreshToken: 'new-refresh',
            });

            const result = await authService.refreshToken('valid-refresh');

            expect(jwtService.storeRefreshToken).toHaveBeenCalledWith(
                mockUser._id,
                'new-refresh',
            );
            expect(result.accessToken).toBe('new-access');
        });
    });
});
