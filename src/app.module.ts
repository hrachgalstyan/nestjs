import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '@Modules/cats/cats.module';
import { LoggerMiddleware } from '@Middlewares/logger.middleware';
import { CatsController } from '@Modules/cats/cats.controller';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from '@Filters/http-exception.filter';
import { LoggingInterceptor } from '@Interceptors/logging.interceptor';

@Global()
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'app', method: RequestMethod.GET })
      .forRoutes({ path: 'cats', method: RequestMethod.GET }, CatsController);
  }
}
