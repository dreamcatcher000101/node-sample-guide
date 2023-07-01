import httpStatus from 'http-status';

import { CustomError } from './CustomError';

export class CreateFailedError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.FAILED_DEPENDENCY, reasonCode);
  }
}
