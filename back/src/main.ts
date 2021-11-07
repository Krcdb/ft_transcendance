import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { loadFixtures } from './config/seeder';
import { Connection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ });
  await app.listen(3000);
  // await loadFixtures('fixtures', await app.get(Connection));
  // await loadFixtures('fixtures', AppModule.getConnection());
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();