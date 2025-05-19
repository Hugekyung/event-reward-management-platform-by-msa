import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { verifyJwt } from './jwt.helper';

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): JwtPayload => {
        const req = ctx.switchToHttp().getRequest();
        const token = req.headers.authorization?.replace('Bearer ', '');
        const secret = process.env.JWT_ACCESS_SECRET!;
        return verifyJwt(token, secret);
    },
);
