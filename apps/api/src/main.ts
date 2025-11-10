import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './common/socket/socket.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins
  app.enableCors();
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
