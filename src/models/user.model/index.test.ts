import { faker } from "@faker-js/faker";

import setupTestDB from "../../setups/testDB.setup";

import UserModel, { IUser } from ".";

setupTestDB();

describe("User Model", () => {
  let newUser: IUser;

  beforeEach(() => {
    newUser = {
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.lorem.word(),
    };
  });

  test("should correctly validate", async () => {
    await expect(new UserModel(newUser).validate()).resolves.not.toThrow();
  });

  it("should throw a validation error if any required field is empty", async () => {
    delete newUser.fullname;
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
    newUser.fullname = "";
    await expect(new UserModel(newUser).validate()).rejects.toThrow();

    delete newUser.email;
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
    newUser.email = "";
    await expect(new UserModel(newUser).validate()).rejects.toThrow();

    delete newUser.password;
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
    newUser.password = "";
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
  });

  it("should throw a validation error if fullname is less than 6 characters", async () => {
    newUser.fullname = "xxxxx";
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
  });

  it("should validate the password", async () => {
    const user = new UserModel(newUser);
    await user.setPassword("password");
    await expect(user.validatePassword("password")).toBeTruthy();
  });

  it("should genereate json web token", async () => {
    const user = new UserModel(newUser);
    const authJSON = user.toAuthJSON();
    await expect(authJSON.token).toBeDefined();
  });

  it("should fill createdAt & updatedAt", async () => {
    const user = new UserModel(newUser);
    await user.save();
    await expect(user.createdAt).toBeDefined();
    await expect(user.updatedAt).not.toBeDefined();
    await user.save();
    await expect(user.updatedAt).toBeDefined();
  });
});
