import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { RolesGuard } from './auth/role/role.guard';
import { ProxyController } from './proxy/proxy.controller';
import { ProxyModule } from './proxy/proxy.module';
import { ProxyService } from './proxy/proxy.service';

@Module({
    imports: [
        ProxyModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: resolve(process.cwd(), 'apps/gateway/.env'),
        }),
    ],
    controllers: [ProxyController],
    providers: [JwtStrategy, JwtAuthGuard, RolesGuard, ProxyService],
})
export class GatewayModule {}
