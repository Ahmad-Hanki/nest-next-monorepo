import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    error?: any, // can be string, object, or anything
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        status,
        message,
        error, // attach the raw error here
      },
      status,
    );
  }
}
