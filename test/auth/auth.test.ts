import {HttpStatus, INestApplication} from '@nestjs/common';
import {Express} from 'express';
import {internet, name} from 'faker';
import {agent} from 'supertest';
import {getConnection} from 'typeorm';

import {getNestApplication} from '..';
import {CreateTokenDto} from '../../src/modules/auth/dto/create-token.dto';
import {CreateUserDto} from '../../src/modules/user/dto/create-user.dto';
import {User} from '../../src/modules/user/user.entity';

describe('Auth', () => {
  let server: Express;
  let app: INestApplication;

  beforeAll(async () => {
    app = await getNestApplication();
    server = app.getHttpServer();
    await app.init();

    const userRepository = getConnection().getRepository(User);
    await userRepository.clear();
  });

  describe('# POST /v1/auth/token', () => {
    let token;

    const createTokenDto = new CreateTokenDto();
    createTokenDto.email = internet.email();
    createTokenDto.password = internet.password();

    const createUserDto = new CreateUserDto();
    createUserDto.name = name.findName();
    createUserDto.email = createTokenDto.email;
    createUserDto.password = createTokenDto.password;

    it('should return not found if user not found', async () => {
      const res = await agent(server)
                      .post('/v1/auth/token')
                      .send(createTokenDto)
                      .expect(HttpStatus.NOT_FOUND);
      expect(res.body.access_token).toBeUndefined();
    });

    it('should not allow access to /authorized without token', async () => {
      const res = await agent(server)
                      .get('/v1/auth/authorized')
                      .send()
                      .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return valid token if user found', async () => {
      await agent(server)
          .post('/v1/user')
          .send(createUserDto)
          .expect(HttpStatus.CREATED);
      const res = await agent(server)
                      .post('/v1/auth/token')
                      .send(createTokenDto)
                      .expect(HttpStatus.OK);
      expect(res.body.access_token)
          .toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
      token = res.body.access_token;
    });

    it('should allow access to /authorized with token', async () => {
      const res = await agent(server)
                      .get('/v1/auth/authorized')
                      .set({'Authorization': 'Bearer ' + token})
                      .send()
                      .expect(HttpStatus.OK);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
