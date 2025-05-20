import { All, Controller, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
    IProxyService,
    IProxyServiceToken,
} from '../../common/interface/proxy.service.interface';

@Controller('api')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class ProxyController {
    constructor(
        @Inject(IProxyServiceToken)
        private readonly proxyService: IProxyService,
    ) {}

    @All('{*splat}')
    async handleRequest(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        console.log(request.url); //debug
        return this.proxyService.forwardRequest(request, response);
    }
}
