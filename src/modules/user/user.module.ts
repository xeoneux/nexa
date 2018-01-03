import {Module} from '@nestjs/common';

import {UserController} from './user.controller';
import {UserService} from './user.service';

@Module({
  components: [UserService],
  controllers: [UserController],
})
export class UserModule {
  constructor(){
    console.log("Loaded User Module");
  }
}
