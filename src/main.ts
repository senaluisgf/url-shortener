import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add swagger
  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('Simple API to shorten URLs')
    .setVersion('1.0.0')
    .addTag('URL')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  // allow api access
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  await app.listen(process.env.PORT ?? process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
