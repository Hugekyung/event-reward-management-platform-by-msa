import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    await app.listen(process.env.GATEWAY_SERVER_PORT ?? 3000);
    Logger.log('Gateway Server Start with port 3000 ✅');
}
bootstrap();
