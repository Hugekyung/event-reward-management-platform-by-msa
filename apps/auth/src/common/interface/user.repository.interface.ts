import { IUser, IUserWithId } from '@libs/database/interface/user.interface';

export interface IUserRepository {
    findByEmail(email: string): Promise<Partial<IUserWithId>>;
    findById(sub: string): Promise<Partial<IUserWithId>>;
    create(user: IUser): Promise<void>;
}
