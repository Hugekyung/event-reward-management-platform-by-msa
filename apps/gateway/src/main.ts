import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bodyParser: false });
    const config = app.get<ConfigService>(ConfigService);
    const port: number = +config.get('GATEWAY_SERVER_PORT') || 3000;
    await app.listen(port, () => {
        Logger.log(`GATEWAY_SERVER WITH ${port}PORT CONNECTED`);
    });
}
bootstrap();
