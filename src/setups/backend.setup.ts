import cors from "cors";
import express, { Express } from "express";

import routes from "routes";

import {
  authenticationMiddleware,
  errorMiddleware,
  routeMiddleware,
} from "middlewares";

import { MESSAGES } from "consts";

import { ROUTE_VERSION } from "config";

import { Logger, Env } from "utils";

export const backendSetup = () => {
  const app: Express = express();

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(routeMiddleware);

  // authentication
  // app.use(authenticationMiddleware);

  // routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  // error handler middleware
  app.use(errorMiddleware);

  app.listen(Env.getEnvironmentVariable("PORT"), () => {
    Logger.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};
