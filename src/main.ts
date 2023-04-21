import { NestFactory,Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CORS } from './constants/cors';
async function bootstrap() {
  const app = await NestFactory.create(
  AppModule, 
  { logger: ['error', 'warn', 'log'],
  snapshot: true}
  );
  app.enableCors(CORS)

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))


  const config = new DocumentBuilder()
    .setTitle('Maicol1912 Api')
    .setDescription('Aplication to manage task, and projects')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
