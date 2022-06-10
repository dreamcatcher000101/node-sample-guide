// setups
import { databaseSetup, backendSetup } from "./setups";

// setup function
const setup = async () => {
  try {
    await databaseSetup();
    backendSetup();
  } catch (error) {
    console.log(error);
  }
};

// setup server
setup();
