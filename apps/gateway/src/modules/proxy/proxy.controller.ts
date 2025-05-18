import { All, Controller, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
    IProxyService,
    IProxyServiceToken,
} from '../common/interface/proxy.service.interface';

@Controller('api')
export class ProxyController {
    constructor(
        @Inject(IProxyServiceToken)
        private readonly proxyService: IProxyService,
    ) {}

    @All()
    async handleRequest(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        return this.proxyService.forwardRequest(request, response);
    }
}
