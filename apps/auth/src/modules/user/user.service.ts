import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../../common/constants/token.constants';
import { IUserRepository } from '../../common/interface/user-repository.interface';
import { IUserService } from '../../common/interface/user-service.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}

    async checkAttendance(userId: string): Promise<{ ok: boolean }> {
        const user = await this.userRepository.findById(userId);
        return { ok: user && user.loginCount! > 0 };
    }
}
