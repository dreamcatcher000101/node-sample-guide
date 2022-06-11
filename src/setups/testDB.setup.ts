import mongoose from "mongoose";

import Env from "../utils/env.handler";

const setupTestDB = () => {
  beforeAll(async () => {
    Env.init();

    await mongoose.connect(Env.getEnvironmentVariable("MONGODB_URL"));
  });

  afterEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany({})
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
