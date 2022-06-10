// node_modules
import express, { Express } from "express";
import cors from "cors";

// routes
import routes from "../routes";

// consts
import { MESSAGES } from "../consts";

// config
import { PORT, ROUTE_VERSION } from "../config";

// backend setup
const backendSetup = () => {
  // create express app instance
  const app: Express = express();

  // use cors
  app.use(cors());

  // use express.json middleware
  app.use(express.json());

  // use routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  app.listen(PORT, () => {
    console.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};

export default backendSetup;
