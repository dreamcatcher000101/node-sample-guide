import cors from "cors";
import express, { Express } from "express";

import routes from "../routes";

import { routeMiddleware, errorHandlerMiddleware } from "../middlewares";

import { MESSAGES } from "../consts";

import { ROUTE_VERSION } from "../config";

import { Logger, Env } from "../utils";

const createApp = () => {
  const app: Express = express();

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(routeMiddleware);

  // routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  // middlewares
  app.use(errorHandlerMiddleware);

  return app;
};

const setupBackend = () => {
  const app = createApp();

  app.listen(Env.getEnvironmentVariable("PORT"), () => {
    Logger.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};

export default setupBackend;

export const App = createApp();
