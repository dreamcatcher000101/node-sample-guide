import { databaseSetup, backendSetup } from "./setups";

import { MESSAGES } from "./consts";

import { Logger, Env } from "./utils";

const setupServer = async () => {
  // initialize multiple environments
  Env.init();

  try {
    await databaseSetup();
    Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);
  } catch (error: any) {
    Logger.info(MESSAGES.DATABASE.CONNECTION_FAILURE);
    Logger.error(error);
  }

  try {
    await backendSetup();
  } catch (error: any) {
    Logger.info(MESSAGES.SERVER.STARTING_FAILURE);
    Logger.error(error);
  }
};

setupServer();
