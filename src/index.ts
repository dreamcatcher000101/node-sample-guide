import { setupDatabase, setupBackend } from "./setups";

import { MESSAGES } from "./consts";

import { Logger, Env } from "./utils";

const setupServer = async () => {
  // initialize multiple environments
  Env.init();

  try {
    await setupDatabase();
    Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);
  } catch (error: any) {
    Logger.info(MESSAGES.DATABASE.CONNECTION_FAILURE);
    Logger.error(error);
  }

  try {
    await setupBackend();
  } catch (error: any) {
    Logger.info(MESSAGES.SERVER.STARTING_FAILURE);
    Logger.error(error);
  }
};

setupServer();
