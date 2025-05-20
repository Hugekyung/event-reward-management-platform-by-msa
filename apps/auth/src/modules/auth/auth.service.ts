import { IUser, IUserWithId } from '@libs/database/interface/user.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    JwtServiceToken,
    UserRepositoryToken,
} from '../../common/constants/token.constants';
import { IAuthService } from '../../common/interface/auth-service.interface';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { IJwtService } from '../../common/interface/jwt-service.interface';
import { IUserRepository } from '../../common/interface/user-repository.interface';
import { PasswordUtil } from '../../common/utils/password.util';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { UserFactory } from './dto/user.factory';

@Injectable()
export class AuthService implements IAuthService {
    private readonly inviteCodeMaps: Record<
        string,
        UserRole.OPERATOR | UserRole.AUDITOR | UserRole.ADMIN
    >;
    constructor(
        private readonly config: ConfigService,
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,
        @Inject(JwtServiceToken)
        private readonly jwtService: IJwtService,
    ) {
        this.inviteCodeMaps = {
            [this.config.get('INVITE_OPERATOR_CODE')]: UserRole.OPERATOR,
            [this.config.get('INVITE_AUDITOR_CODE')]: UserRole.AUDITOR,
            [this.config.get('INVITE_ADMIN_CODE')]: UserRole.ADMIN,
        };
    }

    async createUser(
        createUserDto: CreateUserDto | CreateAdminUserDto,
    ): Promise<void> {
        // * 이메일 중복 검사
        await this.emailDuplicatedCheck(createUserDto.email);

        // * 비밀번호 해싱
        const hashedPassword = await PasswordUtil.generateHash(
            createUserDto.password,
        );

        // * 일반 유저 가입
        let userObject: IUser = UserFactory.create(
            createUserDto,
            hashedPassword,
            UserRole.USER,
        );

        if (this.isCreateAdminUserDto(createUserDto)) {
            // * 관리자 가입
            const role = this.resolveAdminRole(createUserDto.inviteCode);
            userObject = { ...userObject, role };
        }
        await this.userRepository.create(userObject);
        return;
    }

    async login(dto: LoginUserDto): Promise<TokenResponseDto> {
        const user: IUserWithId = await this.userRepository.findByEmail(
            dto.email,
        );
        if (
            !user ||
            !(await PasswordUtil.verify(dto.password, user.password))
        ) {
            throw new UnauthorizedException(
                '이메일 또는 비밀번호가 일치하지 않습니다.',
            );
        }

        // * 로그인 카운트 증가
        await this.userRepository.increaseLoginCount(user._id.toString());

        const { accessToken, refreshToken } = this.jwtService.issueTokens(user);
        await this.jwtService.storeRefreshToken(user._id, refreshToken);

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
        const payload: JwtPayload =
            this.jwtService.verifyRefreshToken(refreshToken);
        await this.jwtService.validateRefreshToken(payload.sub, refreshToken);

        const user = await this.userRepository.findById(payload.sub);
        const tokens = this.jwtService.issueTokens(user);
        await this.jwtService.storeRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }

    private isCreateAdminUserDto(
        dto: CreateUserDto | CreateAdminUserDto,
    ): dto is CreateAdminUserDto {
        return 'inviteCode' in dto;
    }

    private resolveAdminRole(
        inviteCode: string,
    ): UserRole.OPERATOR | UserRole.AUDITOR | UserRole.ADMIN {
        if (!this.inviteCodeMaps[inviteCode]) {
            throw new BadRequestException('잘못된 관리자 등록 코드입니다.');
        }
        return this.inviteCodeMaps[inviteCode];
    }

    private async emailDuplicatedCheck(email: string): Promise<void> {
        const existingUser = await this.userRepository.existsByEmail(email);
        if (existingUser) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }
    }
}
