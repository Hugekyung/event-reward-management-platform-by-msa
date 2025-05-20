import { Module } from '@nestjs/common';
import { IProxyServiceToken } from '../../common/interface/proxy.service.interface';
import { ProxyService } from './proxy.service';

@Module({
    // controllers: [ProxyController],
    providers: [
        {
            provide: IProxyServiceToken,
            useClass: ProxyService,
        },
    ],
    exports: [IProxyServiceToken],
})
export class ProxyModule {}
