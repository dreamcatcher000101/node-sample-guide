// setups
import { databaseSetup, backendSetup } from "./setups";

// utils
import { Logger } from "./utils";

// setup function
const setup = async () => {
  try {
    await databaseSetup();
    backendSetup();
  } catch (error: any) {
    Logger.error(error);
  }
};

// setup server
setup();
