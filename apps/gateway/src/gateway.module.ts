import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { RolesGuard } from './auth/role/role.guard';
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
    providers: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class GatewayModule {}
