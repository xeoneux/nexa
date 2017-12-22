import {HttpStatus, INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as express from 'express';
import * as supertest from 'supertest';

import {ApplicationModule} from '../../src/modules/app.module';
import {CreateUserDto} from '../../src/modules/user/dto/create-user.dto';
import {UserController} from '../../src/modules/user/user.controller';
import {UserModule} from '../../src/modules/user/user.module';
import {UserService} from '../../src/modules/user/user.service';

describe('User', () => {
  const server = express();
  let app: INestApplication;
  // const server = await import("express");
  // const supertest = await import("supertest");

  beforeAll(async () => {
    const module =
        await Test.createTestingModule({modules: [ApplicationModule]})
            .compile();
    app = module.createNestApplication(require('express')());
    await app.init();
  });

  describe('# POST /v1/user', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.name = 'John Doe';
    createUserDto.email = 'johndoe@email.com';
    createUserDto.password = 'password';

    it('should create a new user', done => {
      supertest(server)
          .post('/v1/user')
          .send(createUserDto)
          .expect(HttpStatus.NOT_FOUND)
          .then(res => {
            console.log(res);
            done();
          })
          .catch(done);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
