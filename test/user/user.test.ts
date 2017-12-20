import {Test} from '@nestjs/testing';
import * as express from 'express';
import * as request from 'supertest';

import {UserModule} from '../../src/modules/user/user.module';
import {UserService} from '../../src/modules/user/user.service';

describe('Cats', () => {
  const server = express();
  const userService = {findAll: () => ['test']};

  beforeAll(async () => {
    const module = await Test
                       .createTestingModule({
                         modules: [UserModule],
                       })
                       .overrideComponent(UserService)
                       .useValue(userService)
                       .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(server).get('/cats').expect(200).expect({
      data: userService.findAll(),
    });
  });
});
