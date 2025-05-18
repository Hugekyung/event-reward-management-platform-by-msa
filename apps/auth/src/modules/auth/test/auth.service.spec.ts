import { UserRole } from '@libs/enum/user-role.enum';
import { UnauthorizedException } from '@nestjs/common';
import { IJwtService } from '../../../common/interface/jwt-service.interface';
import { IUserRepository } from '../../../common/interface/user.repository.interface';
import { PasswordUtil } from '../../../common/utils/password.util';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { AuthService } from '../auth.service';

jest.mock('../../common/utils/password.util');

describe('AuthService', () => {
    let authService: AuthService;
    let userRepository: jest.Mocked<IUserRepository>;
    let jwtService: jest.Mocked<IJwtService>;

    const mockUser = {
        _id: '1',
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
        };

        jwtService = {
            issueTokens: jest.fn(),
            storeRefreshToken: jest.fn(),
            verifyRefreshToken: jest.fn(),
            validateRefreshToken: jest.fn(),
        };

        authService = new AuthService(userRepository, jwtService);
    });

    describe('login API', () => {
        it('비밀번호가 틀리면 UnauthorizedException가 발생한다', async () => {
            userRepository.findByEmail.mockResolvedValue(mockUser);
            (PasswordUtil.verify as jest.Mock).mockResolvedValue(false);

            const dto: LoginUserDto = {
                email: mockUser.email,
                password: 'wrong',
            };

            const result = await authService.login(dto);

            expect(result).rejects.toThrow(UnauthorizedException);
        });

        it('로그인 성공 시 토큰 발급 및 저장한다', async () => {
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

    describe('refreshToken API', () => {
        it('refreshToken 검증 실패 시 UnauthorizedException가 발생한다', async () => {
            jwtService.verifyRefreshToken.mockImplementation(() => {
                throw new UnauthorizedException();
            });

            const result = await authService.refreshToken('invalid');

            expect(result).rejects.toThrow(UnauthorizedException);
        });

        it('refreshToken 검증에 성공하면 새로운 access/refresh 토큰을 발급한다', async () => {
            jwtService.verifyRefreshToken.mockReturnValue({
                sub: mockUser._id,
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
