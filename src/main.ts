import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 30000);
}
bootstrap()
  .then(() => console.log('Server started on port 30000'))
  .catch((err) => console.error(err));
