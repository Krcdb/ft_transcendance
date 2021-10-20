import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FortyTwoAuthGuard } from './auth/FortyTwo-auth.guard';
// import { useContainer } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new FortyTwoAuthGuard());
  app.enableCors( {
    // allowedHeaders:"*",
    // origin: "*"
  });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();