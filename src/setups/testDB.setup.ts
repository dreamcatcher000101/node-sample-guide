import mongoose from "mongoose";

import Env from "../utils/env.handler";

const testDBSetup = () => {
  beforeAll(async () => {
    Env.init();

    await mongoose.connect(Env.getEnvironmentVariable("MONGODB_URL"));
  });

  beforeEach(async () => {
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

export default testDBSetup;
