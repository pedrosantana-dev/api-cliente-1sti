import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //prefixo global para os endpoints
  app.setGlobalPrefix('api');

  // Cors ativado para cruzar informações com Angular
  /* app.enableCors({
    origin: ["http://localhost:4200"]
  }); */
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('1STi API Desafio')
    .setDescription('Desafio proposto pelo Tech lead da 1STi')
    .setVersion('1.0')
    .addTag('usuarios')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
