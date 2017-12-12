import { NestFactory } from "@nestjs/core";

import { ApplicationModule } from "./app.module";

(async () => {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(1234); 
})();
