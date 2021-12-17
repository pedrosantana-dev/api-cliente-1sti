import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //prefixo global para os endpoints
  app.setGlobalPrefix('api');

  // Cors ativado para cruzar informações com Angular
  /* app.enableCors({
    origin: ["http://localhost:4200"]
  }); */

  await app.listen(3000);
}
bootstrap();
