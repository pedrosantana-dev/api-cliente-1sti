import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { HttpModule } from '@nestjs/axios';
import { CepModule } from './cep/cep.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsuarioModule,
    HttpModule,
    CepModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
