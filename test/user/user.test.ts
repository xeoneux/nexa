import {HttpStatus, INestApplication} from '@nestjs/common';
import {Express} from 'express';
import {agent} from 'supertest';

import {CreateUserDto} from '../../src/modules/user/dto/create-user.dto';
import {getNestApplication} from '../server';

describe('User', () => {
  let server: Express;
  let app: INestApplication;

  beforeAll(async () => {
    app = await getNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  describe('# POST /v1/user', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.name = 'John Doe';
    createUserDto.email = 'johndoe@mail.com';
    createUserDto.password = 'password';

    it('should create a new user', async () => {
      const res = await agent(server)
                      .post('/v1/user')
                      .send(createUserDto)
                      .expect(HttpStatus.CREATED);
      expect(res.body.name).toBe(createUserDto.name);
      expect(res.body.email).toBe(createUserDto.email);
      expect(res.body.password).toBe(createUserDto.password);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
