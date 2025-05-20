import { IUser, IUserWithId } from '@libs/database/interface/user.interface';

export interface IUserRepository {
    existsByEmail(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<IUserWithId | null>;
    findById(sub: string): Promise<IUserWithId | null>;
    create(user: IUser): Promise<void>;
    increaseLoginCount(userId: string): Promise<void>;
}
