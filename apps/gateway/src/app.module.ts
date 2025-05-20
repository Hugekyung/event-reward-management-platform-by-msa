import { LoggerMiddleware } from '@libs/shared/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { ProxyController } from './modules/proxy/proxy.controller';
import { ProxyModule } from './modules/proxy/proxy.module';

@Module({
    imports: [
        ProxyModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: resolve(process.cwd(), 'apps/gateway/.env'),
        }),
    ],
    controllers: [ProxyController],
    providers: [JwtStrategy, JwtAuthGuard],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
