import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { MainModule } from './main.module';

import config from './config';

async function bootstrap() {
  const { port, swagger } = config();
  const app = await NestFactory.create(MainModule);
  const options = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addTag(swagger.tag)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
