import { IUser } from '@libs/database/interface/user.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryToken } from '../../common/constants/token.constants';
import { IUserService } from '../../common/interface/user-service.interface';
import { IUserRepository } from '../../common/interface/user.repository.interface';
import { PasswordUtil } from '../../common/utils/password.util';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFactory } from './user.factory';

@Injectable()
export class UserService implements IUserService {
    private readonly inviteCodeMaps: Record<
        string,
        UserRole.OPERATOR | UserRole.AUDITOR | UserRole.ADMIN
    >;
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,
        private readonly config: ConfigService,
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
        const hashedPassword = await PasswordUtil.generateHash(
            createUserDto.password,
        );
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

        // * 일반 유저 가입
        await this.userRepository.create(userObject);
        return;
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
}
