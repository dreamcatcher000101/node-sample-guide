import { Request, Response, NextFunction } from "express";

import { Logger, Env } from "../utils";

const routeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  Logger.group({
    title: "New Request",
    descriptions: [
      {
        description: "URL",
        info: `${req.protocol}://${req.hostname}:${Env.getEnvironmentVariable(
          "PORT"
        )}${req.url}`,
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

  next();
};

export default routeMiddleware;
