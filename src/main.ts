import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CORS } from './constants/cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'], });
  //to allow cross origin main 
  app.enableCors(CORS)

  //para usar las validaciones usadas de class-validator
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  //Endpoint adicional para agrgar a la app
  //app.setGlobalPrefix('api')


  //generate documentation with swagger
  const config = new DocumentBuilder()
    .setTitle('Task api example')
    .setDescription('Api crud about tasks')
    .setVersion('1.0')
    .addTag('user')
    .addTag('project')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document)

  await app.listen(process.env.PORT);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
