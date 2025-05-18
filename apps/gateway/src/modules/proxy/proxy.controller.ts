import { All, Controller, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RolesGuard } from '../../auth/role/role.guard';
import {
    IProxyService,
    IProxyServiceToken,
} from '../../common/interface/proxy.service.interface';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProxyController {
    constructor(
        @Inject(IProxyServiceToken)
        private readonly proxyService: IProxyService,
    ) {}

    @All() // ! 라우팅을 어떻게 처리할지 고민해보기
    async handleRequest(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        return this.proxyService.forwardRequest(request, response);
    }
}
