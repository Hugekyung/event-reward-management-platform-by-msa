import { getMongoUri } from '@libs/database/config/db.config';
import { UserSchema } from '@libs/database/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: resolve(process.cwd(), 'apps/auth/.env'),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                const uri = getMongoUri({
                    host: config.get('MONGO_HOST'),
                    port: parseInt(config.get('MONGO_PORT')!),
                    dbName: config.get('MONGO_DB_NAME')!,
                });
                console.log('📦 Mongo URI:', uri);
                return { uri };
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UserModule,
    ],
})
export class AppModule {}
