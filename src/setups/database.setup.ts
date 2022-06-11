import mongoose from "mongoose";

import { Env } from "../utils";

const setupDatabase = async () => {
  await mongoose.connect(Env.getEnvironmentVariable("MONGODB_URL"));
};

export default setupDatabase;
