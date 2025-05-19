import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    const config = app.get<ConfigService>(ConfigService);
    const port: number = +config.get('GATEWAY_SERVER_PORT') || 3000;
    await app.listen(port, () => {
        Logger.log(`GATEWAY_SERVER WITH ${port}PORT CONNECTED`);
    });
}
bootstrap();
