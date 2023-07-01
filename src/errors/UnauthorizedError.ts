import httpStatus from "http-status";

import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.UNAUTHORIZED, reasonCode);
  }
}
