import { All, Controller, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import {
    IProxyService,
    IProxyServiceToken,
} from '../../common/interface/proxy.service.interface';

@Controller('api')
export class ProxyController {
    constructor(
        @Inject(IProxyServiceToken)
        private readonly proxyService: IProxyService,
    ) {}

    @All('auth/{*splat}')
    async handleRequestAuth(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        console.log('auth >>', request.url); //debug
        return this.proxyService.forwardRequest(request, response);
    }

    @All('{*splat}')
    @UseGuards(JwtAuthGuard)
    async handleRequest(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        console.log('not auth >>', request.url); //debug
        return this.proxyService.forwardRequest(request, response);
    }
}
