import { Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR || 500;
    const message = response.message || exception.message || 'Internal Server Error';
    const error = {
      error: exception.getResponse()
    };

    response.status(status).json(error);
  }
}
