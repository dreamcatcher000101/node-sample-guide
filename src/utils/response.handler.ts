// node_modules
import { Response } from "express";

// utils
import APIError from "./api.error";
import Logger from "./logger";

class ResponseHandler {
  success(res: Response, result: any) {
    Logger.log("Response: ", result);
    res.status(200).json(result);
  }

  failure(res: Response, error: APIError) {
    Logger.log("Error: ", error.message, String(error.stack));
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
}

export default new ResponseHandler();
