import httpStatus from 'http-status';

import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.NOT_FOUND, reasonCode);
  }
}
