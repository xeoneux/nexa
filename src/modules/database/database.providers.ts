import {Connection, createConnection} from 'typeorm';

export const databaseProviders = [{
  provide: 'DbConnectionToken',
  useFactory: async () => await createConnection({
    port: 3306,
    type: 'postgres',
    username: 'root',
    password: 'pass',
    database: 'nexa',
    host: 'localhost',
    entities: [],
    synchronize: true  // DEV only, do not use on PROD!
  })
}];
