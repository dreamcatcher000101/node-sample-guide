import { faker } from "@faker-js/faker";

import setupTestDB from "../../setups/testDB.setup";

import { createUser } from ".";

import { IUser } from "../../models";

setupTestDB();

describe("User Service", () => {
  let newUser: IUser;

  beforeEach(() => {
    newUser = {
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.lorem.word(),
    };
  });

  test("should create new user", async () => {
    await expect(createUser(newUser)).resolves.not.toThrow();
    await expect(createUser(newUser)).resolves.not.toThrow();
  });
});
