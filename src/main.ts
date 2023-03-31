import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DtoValidationPipe } from './pipes/dto.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes( new DtoValidationPipe());

  await app.listen(3000);
}
bootstrap();
