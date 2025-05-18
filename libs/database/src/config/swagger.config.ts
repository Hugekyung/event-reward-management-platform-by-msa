import type { INestApplication, Type } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
    static swaggerBuilder<T>(
        app: INestApplication,
        config: ConfigService,
        indexModule: Type<T>,
    ) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('Anonymous Board API Docs')
            .setVersion('1.0')
            .addApiKey(
                {
                    type: 'apiKey',
                    name: 'swagger-api-key',
                    in: 'header',
                },
                'swagger-api-key',
            )
            .build() as OpenAPIObject;

        const swaggerCustomOptions: SwaggerCustomOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
        };

        const document = SwaggerModule.createDocument(app, swaggerConfig, {
            include: [indexModule],
            deepScanRoutes: true,
        });

        SwaggerModule.setup(
            config.get('SWAGGER_END_POINT') ?? 'anonymous_board_swagger',
            app,
            document,
            swaggerCustomOptions,
        );
    }
}
