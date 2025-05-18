import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IProxyService } from '../common/interface/proxy.service.interface';
import { mappingTargetAPI } from '../config/http-proxy.config';

@Injectable()
export class ProxyService implements IProxyService {
    constructor() {}

    async forwardRequest(req: Request, res: Response): Promise<void> {
        const target = mappingTargetAPI(req.path);
        return createProxyMiddleware({ target, changeOrigin: true })(
            req,
            res,
            () => {},
        );
    }
}
