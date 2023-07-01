import mongoose from "mongoose";

import { Env } from "utils";

export const databaseSetup = async () => {
  await mongoose.connect(Env.getEnvironmentVariable("MONGODB_URL"));
};
