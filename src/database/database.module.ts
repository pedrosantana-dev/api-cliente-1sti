import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('TYPEORM_HOST'),
                port: configService.get('TYPEORM_PORT'),
                username: configService.get('TYPEORM_USERNAME'),
                password: configService.get('TYPEORM_PASSWORD'),
                database: configService.get('TYPEORM_DATABASE'),
                autoLoadEntities: true,
                synchronize: true
            })
        })
    ]
})
export class DatabaseModule {}
