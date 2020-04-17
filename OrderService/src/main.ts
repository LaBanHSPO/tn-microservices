import { 
  NestFactory, 
  // HttpAdapterHost
} from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import {AppInterceptor} from './app/app.interceptor';
// import { AllExceptionsFilter } from './app/all-exceptions.filter';

(async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,  new FastifyAdapter({
    // logger: process.env.NODE_ENV === 'development'
  }));

  app.enableCors();

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // access config services
  const configService = app.get(ConfigService);
  const HOST_NAME = configService.get<string>('HOST_NAME');
  const SERVER_PORT = configService.get<number>('SERVER_PORT');
  // swagger automate api docs

  const API_DOCS_URI = configService.get<string>('API_DOCS_URI');
  const API_DOCS_TITLE='API Document'
  const API_DOCS_DESCRIPTION='Buit on Lean Stacks System'
  const API_DOCS_VERSION='1.0'
  const API_DOCS_TAG='lean-stacks'

  const options = new DocumentBuilder()
  .setTitle(API_DOCS_TITLE)
  .setDescription(API_DOCS_DESCRIPTION)
  .setVersion(API_DOCS_VERSION)
  .addTag(API_DOCS_TAG)
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_DOCS_URI, app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new AppInterceptor());

  await app.listen(SERVER_PORT, HOST_NAME);
  console.log(`\n Server ready at: ${await app.getUrl()}`);

})();
