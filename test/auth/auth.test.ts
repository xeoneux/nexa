import {HttpStatus, INestApplication} from '@nestjs/common';
import {Express} from 'express';
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
    const createTokenDto = new CreateTokenDto();
    createTokenDto.email = 'johndoe@mail.com';
    createTokenDto.password = 'password';

    it('should return not found if user not found', async () => {
      const res = await agent(server)
                      .post('/v1/auth/token')
                      .send(createTokenDto)
                      .expect(HttpStatus.NOT_FOUND);
      expect(res.body.access_token).toBeUndefined()
    });

    it('should return valid token if user found', async () => {
      const createUserDto = new CreateUserDto();
      createUserDto.name = 'John Doe';
      createUserDto.email = 'johndoe@mail.com';
      createUserDto.password = 'password';
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
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
