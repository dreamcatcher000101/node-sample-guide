// node_modules
import mongoose from "mongoose";

// consts
import { MESSAGES } from "../consts";

// utils
import { Logger, Env } from "../utils";

// database setup
const databaseSetup = async () => {
  return new Promise((resolve, reject) => {
    // connec to mongodb database
    mongoose
      .connect(Env.getEnvironmentVariable("MONGODB_URL"))
      .then(() => {
        // connection success
        Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);

        resolve(null);
      })
      .catch((error) => {
        // connection failure
        Logger.info(MESSAGES.DATABASE.CONNECTION_FAILURE);

        reject(error);
      });
  });
};

export default databaseSetup;
