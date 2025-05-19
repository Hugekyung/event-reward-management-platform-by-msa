import { IUser, IUserWithId } from '@libs/database/interface/user.interface';

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserWithId>;
    findById(sub: string): Promise<IUserWithId>;
    create(user: IUser): Promise<void>;
    increaseLoginCount(userId: string): Promise<void>;
}
