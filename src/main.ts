import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    autoFlushLogs: true,
    bodyParser: true,
    cors: true,
  });

  app.use(
    session({
      secret: 'nestjs',
      cookie: {
        secure: process.env['NODE_ENV'] === 'production',
      },
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(5001);
}

bootstrap()
  .then(() => console.log('Application is listening on port 5001'))
  .catch((err) => console.error(err));
