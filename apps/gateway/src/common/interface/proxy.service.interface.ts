import type { Request, Response } from 'express';

export interface IProxyService {
    forwardRequest(req: Request, res: Response): Promise<void>;
}

export const IProxyServiceToken = Symbol('IProxyService');
