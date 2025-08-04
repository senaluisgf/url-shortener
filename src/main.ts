import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add swagger
  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('Simple API to shorten URLs with Authentication')
    .setVersion('2.0.0')
    // add authentication on swagger
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // allow api access
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  await app.listen(process.env.PORT ?? process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
