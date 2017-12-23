import {HttpStatus, INestApplication} from '@nestjs/common';
import {ValidationPipe} from '@nestjs/common';
import {Test} from '@nestjs/testing';

import * as express from 'express';

import {ApplicationModule} from '../src/modules/app.module';

let app: INestApplication;

export const getNestApplication = async () => {
  if (app) return app;
  const module =
      await Test.createTestingModule({modules: [ApplicationModule]}).compile();
  app = module.createNestApplication(express());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  return app;
};
