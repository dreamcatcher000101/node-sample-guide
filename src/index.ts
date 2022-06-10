// setups
import { databaseSetup, backendSetup } from "./setups";

// utils
import { Logger, Env } from "./utils";

// setup function
const setup = async () => {
  try {
    Env.init();
    await databaseSetup();
    backendSetup();
  } catch (error: any) {
    Logger.error(error);
  }
};

// setup server
setup();
