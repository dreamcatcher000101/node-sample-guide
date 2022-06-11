import mongoose from "mongoose";

import { Env } from "../utils";

const databaseSetup = async () => {
  await mongoose.connect(Env.getEnvironmentVariable("MONGODB_URL"));
};

export default databaseSetup;
