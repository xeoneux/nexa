import {HttpStatus, INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as express from 'express';
import * as supertest from 'supertest';

import {CreateUserDto} from '../../src/modules/user/dto/create-user.dto';
import {UserModule} from '../../src/modules/user/user.module';
import {UserService} from '../../src/modules/user/user.service';

describe('User', () => {
  let app: INestApplication;
  const server = express();
  // const server = await import("express");
  // const supertest = await import("supertest");

  beforeAll(async () => {
    const module =
        await Test.createTestingModule({modules: [UserModule]}).compile();
    app = module.createNestApplication(require('express')());
    await app.init();
  });

  describe('# POST /api/users', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.name = 'John Doe';
    createUserDto.email = 'johndoe@email.com';
    createUserDto.password = 'password';

    it('should create a new user', done => {
      supertest(server)
          .post('/api/users')
          .send(createUserDto)
          .expect(HttpStatus.OK)
          .then(res => {
            console.log(res);
            // expect(res.body.username).to.equal(user.username);
            // expect(res.body.mobileNumber).to.equal(user.mobileNumber);
            // user = res.body;
            done();
          })
          .catch(done);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
