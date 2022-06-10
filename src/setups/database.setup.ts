// node_modules
import mongoose from "mongoose";

// config
import { DATABASES } from "../config";

// consts
import { MESSAGES } from "../consts";

const databaseSetup = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DATABASES.MONGODB.URL)
      .then(() => {
        resolve(null);

        console.log(MESSAGES.DATABASE.CONNECTION_SUCCESS);
      })
      .catch((error) => {
        console.log(MESSAGES.DATABASE.CONNECTION_FAILURE);
        console.log(error.message);

        reject(error);
      });
  });
};

export default databaseSetup;
