import { IUser } from '@libs/database/interface/user.interface';
import { JwtPayload } from './jwt-payload.interface';

export interface IJwtService {
    issueTokens(user: IUser): { accessToken: string; refreshToken: string };
    storeRefreshToken(userId: string, token: string): Promise<void>;
    verifyRefreshToken(token: string): JwtPayload;
    validateRefreshToken(userId: string, givenToken: string): Promise<void>;
}
