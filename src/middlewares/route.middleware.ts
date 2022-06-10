// node_modules
import { Request, Response, NextFunction } from "express";

// config
import { DEBUG } from "../config";

// utils
import { Logger } from "../utils";

const routeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (DEBUG.REQUEST_SHOW) {
    Logger.group({
      title: "New Request",
      descriptions: [
        {
          description: "URL",
          info: `${req.protocol}://${req.hostname}${req.url}`,
        },
        {
          description: "PARAMS",
          info: req.params,
        },
        {
          description: "QUERY",
          info: req.query,
        },
        {
          description: "BODY",
          info: req.body,
        },
      ],
    });
  }

  next();
};

export default routeMiddleware;
