// node_modules
import { Request, Response, NextFunction } from "express";

// config
const { DEBUG } = require("../config");

const routeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (DEBUG.REQUEST_SHOW) {
    console.group("/----------------New Request---------------/");
    if (DEBUG.URL) {
      console.log("URL:", `${req.protocol}://${req.hostname}${req.url}`);
    }
    if (DEBUG.PARAMS) {
      console.log("PARAMS:", req.params);
    }
    if (DEBUG.QUERY) {
      console.log("QUERY:", req.query);
    }
    if (DEBUG.BODY) {
      console.log("BODY:", req.body);
    }
    console.groupEnd();
    console.log("/---------------That's all----------------/");
  }

  next();
};

export default routeMiddleware;
