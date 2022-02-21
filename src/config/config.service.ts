import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {

  constructor() { }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
      return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        synchronize: true,
        autoLoadEntities: true,
        dropSchema: false,
      }
  }

}

const configService = new ConfigService();

export { configService };
