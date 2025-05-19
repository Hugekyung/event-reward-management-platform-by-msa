import { IUser } from '@libs/database/interface/user.interface';
import { Types } from 'mongoose';
import { JwtPayload } from './jwt-payload.interface';

export interface IJwtService {
    issueTokens(user: IUser): { accessToken: string; refreshToken: string };
    storeRefreshToken(userId: Types.ObjectId, token: string): Promise<void>;
    verifyRefreshToken(token: string): JwtPayload;
    validateRefreshToken(sub: string, givenToken: string): Promise<void>;
}
