// node_modules
import mongoose from "mongoose";

// config
import { DATABASES } from "../config";

// consts
import { MESSAGES } from "../consts";

// utils
import { Logger } from "../utils";

const databaseSetup = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DATABASES.MONGODB.URL)
      .then(() => {
        resolve(null);

        Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);
      })
      .catch((error) => {
        Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);

        reject(error);
      });
  });
};

export default databaseSetup;
