import httpStatus from 'http-status';

import { CustomError } from './CustomError';

export class ArgumentValidationError extends CustomError {
  messages: string[];

  constructor(message: string, messages: string[], reasonCode?: string) {
    super(message, httpStatus.BAD_REQUEST, reasonCode);

    this.messages = messages;
  }
}
