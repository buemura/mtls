import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    cert: fs.readFileSync('../certs/server.crt'),
    key: fs.readFileSync('../certs/server.key'),
    ca: fs.readFileSync('../certs/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false,
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  await app
    .listen(3000)
    .then(() => console.log('Service A is running on port 3000'));
}
bootstrap();
