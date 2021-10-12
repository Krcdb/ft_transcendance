import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { useContainer } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // useContainer(app.select(AppModule), { fallbackOnErrors: true }); //allows class-validator to use NestJS dependency injection container
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();