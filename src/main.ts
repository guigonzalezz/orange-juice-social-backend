import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
//import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalInterceptors(new ExcludeNullInterceptor());
  //app.use(cookieParser());

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

  await app.listen(3000);
}
bootstrap();
