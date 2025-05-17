import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { mappingTargetAPI } from '../config/http-proxy.config';

@Injectable()
export class ProxyService {
    constructor() {}

    async forwardRequest(req: Request, res: Response) {
        const target = mappingTargetAPI(req.path);
        return createProxyMiddleware({ target, changeOrigin: true })(
            req,
            res,
            () => {},
        );
    }
}
