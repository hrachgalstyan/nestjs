import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  Session,
  Headers,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller({ host: 'localhost', path: 'app', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * We can use @Session() decorator to access the session object.
   * @param session
   */
  @Get('session')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.OK)
  getSession(@Session() session: Record<string, any>): Record<string, any> {
    return session;
  }

  /**
   * We can use @Param() decorator to access the request parameters.
   * @param param
   */
  @Get('param/:param')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.OK)
  getParam(@Param('param') param: string): string {
    return param;
  }

  /**
   * We can use @Query() to get the query parameters from the request.
   * @param query
   */
  @Get('query')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.OK)
  getQuery(@Query() query: any): string {
    return query;
  }

  /**
   * We can use @Headers() decorator to access the request headers.
   * @param headers
   */
  @Get('headers')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.OK)
  getHeaders(@Headers() headers: any): any {
    return headers;
  }

  /**
   * We can use @Req() decorator to access the request object.
   * @param request
   */
  @Get('request')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.OK)
  getRequest(@Req() request: Request): string {
    console.log(request);
    return 'Request';
  }

  /**
   * We can use @Res() decorator to access the response object.
   * @param response
   */
  @Get('response')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.OK)
  getResponse(@Res() response: Response): Response {
    console.log(response);
    return response.send('Response');
  }
}
