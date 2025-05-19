import { SwaggerConfig } from '@libs/database/config/swagger.config';
import type { ValidationError } from '@nestjs/common';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IndexModule } from './modules/index.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);

    // * Swagger
    SwaggerConfig.swaggerBuilder(app, config, IndexModule);

    // * Validation Pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory: (errors: ValidationError[]) =>
                new BadRequestException({
                    resultCode: -1,
                    data: errors[0].constraints,
                }),
        }),
    );

    const port: number = +config.get('AUTH_SERVER_PORT') || 3001;
    await app.listen(port, () => {
        Logger.log(`AUTH SERVER WITH ${port}PORT CONNECTED`);
    });

    app.enableShutdownHooks();
}
bootstrap();
