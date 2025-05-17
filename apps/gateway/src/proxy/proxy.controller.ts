import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller('api')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @All()
    async handleRequest(@Req() request: Request, @Res() response: Response) {
        return this.proxyService.forwardRequest(request, response);
    }
}
