import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import {config} from './config';
import {ApplicationModule} from './modules/app.module';

const PORT = config.PORT;

(async () => {
  const app = await NestFactory.create(ApplicationModule);
  const options = new DocumentBuilder()
                      .setTitle('Nexa')
                      .setVersion('1.0')
                      .setDescription('Nexa API description')
                      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  await app.listen(PORT);
})();
