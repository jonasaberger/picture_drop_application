/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Picture Drop API')
    .setDescription('Backend Endpoints for Picture Drop')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use('/swagger/json', (req, res) => { res.json(document); });
  app.enableCors({
    origin: 'http://localhost:4200', 
  });
  

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
