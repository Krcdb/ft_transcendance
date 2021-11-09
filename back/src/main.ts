import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadDefaults } from './config/loadDefaults';
import { getConnection } from 'typeorm';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, {cors: true});
=======
  const app = await NestFactory.create(AppModule);
>>>>>>> master
  app.enableCors({ });
  await app.listen(3000);
  await loadDefaults(getConnection());
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();