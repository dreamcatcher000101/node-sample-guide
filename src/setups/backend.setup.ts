// node_modules
import express, { Express } from "express";
import cors from "cors";

// routes
import routes from "../routes";

// middlewares
import { routeMiddleware } from "../middlewares";

// consts
import { MESSAGES } from "../consts";

// config
import { PORT, ROUTE_VERSION } from "../config";

// utils
import { Logger } from "../utils";

// backend setup
const backendSetup = () => {
  // create express app instance
  const app: Express = express();

  // use cors
  app.use(cors());

  // use express.json middleware
  app.use(express.json());

  // use customized route logger middleware
  app.use(routeMiddleware);

  // use routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  app.listen(PORT, () => {
    Logger.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};

export default backendSetup;
