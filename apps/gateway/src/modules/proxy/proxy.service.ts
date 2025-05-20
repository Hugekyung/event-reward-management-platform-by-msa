import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IProxyService } from '../../common/interface/proxy.service.interface';
import { mappingRoute } from '../../config/http-proxy.config';

@Injectable()
export class ProxyService implements IProxyService {
    async forwardRequest(req: Request, res: Response): Promise<void> {
        const route = mappingRoute(req.path);
        if (!route) {
            res.status(404).send('요청한 경로를 찾을 수 없습니다.');
            return;
        }

        return createProxyMiddleware({
            target: route.target,
            changeOrigin: true,
            pathRewrite: (path) => path.replace('/api', ''),
            proxyTimeout: 50000,
        })(req, res, () => {});
    }
}
