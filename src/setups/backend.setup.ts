import cors from "cors";
import express, { Express } from "express";

import routes from "../routes";

import { routeMiddleware } from "../middlewares";

import { MESSAGES } from "../consts";

import { ROUTE_VERSION } from "../config";

import { Logger, Env } from "../utils";

const setupBackend = () => {
  const app: Express = express();

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(routeMiddleware);

  // routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  app.listen(Env.getEnvironmentVariable("PORT"), () => {
    Logger.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};

export default setupBackend;
