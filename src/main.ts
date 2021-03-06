import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const cors = require('cors');
  const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus:200
  }
  app.use(cors(corsOptions));

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
