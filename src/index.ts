import { databaseSetup, backendSetup } from "setups";

import { MESSAGES } from "consts";

import { Logger, Env } from "utils";

const setupServer = () => {
  // initialize multiple environments
  Env.init();

  try {
    backendSetup();
  } catch (error: unknown) {
    Logger.info(MESSAGES.SERVER.STARTING_FAILURE);
    Logger.error(error);
  }
};

setupServer();
