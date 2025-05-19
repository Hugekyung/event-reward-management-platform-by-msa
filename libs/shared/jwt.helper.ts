import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interface/jwt-payload.interface';

export function verifyJwt(token: string, secret: string): JwtPayload {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
}
