import {HttpStatus, INestApplication} from '@nestjs/common';
import {Express} from 'express';
import {internet, name} from 'faker';
import {agent} from 'supertest';
import {getConnection} from 'typeorm';

import {getNestApplication} from '..';
import {CreateUserDto} from '../../src/modules/user/dto/create-user.dto';
import {User} from '../../src/modules/user/user.entity';

describe('User', () => {
  let server: Express;
  let app: INestApplication;

  beforeAll(async () => {
    app = await getNestApplication();
    server = app.getHttpServer();
    await app.init();

    const userRepository = getConnection().getRepository(User);
    await userRepository.clear();
  });

  describe('# POST /v1/user', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.name = name.findName();
    createUserDto.email = internet.email();
    createUserDto.password = internet.password();

    it('should create a new user', async () => {
      const res = await agent(server)
                      .post('/v1/user')
                      .send(createUserDto)
                      .expect(HttpStatus.CREATED);
      expect(res.body.name).toBe(createUserDto.name);
      expect(res.body.email).toBe(createUserDto.email);
      expect(res.body.password).toBe(createUserDto.password);
    });

    it('should not create a new user with same creds', async () => {
      const res = await agent(server)
                      .post('/v1/user')
                      .send(createUserDto)
                      .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
