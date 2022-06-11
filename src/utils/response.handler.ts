// node_modules
import { Response } from "express";

// errors
import type { Error } from "../consts";

class ResponseHandler {
  success(res: Response, result: any) {
    res.status(200).json(result);
  }

  failure(res: Response, error: Error) {
    res.status(error.status).json({
      message: error.description,
    });
  }
}

export default new ResponseHandler();
