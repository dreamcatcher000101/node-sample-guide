import { faker } from "@faker-js/faker";

import setupTestDB from "../../setups/testDB.setup";

import UserModel, { IUser } from ".";

import { DATABASE } from "../../config";

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

  test("should throw a validation error if any required field is empty", async () => {
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

  test(`should throw a validation error if fullname is shorter than ${DATABASE.USER.MIN_FULLNAME} characters`, async () => {
    newUser.fullname = new Array(DATABASE.USER.MIN_FULLNAME - 1)
      .fill("1")
      .join("");
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
  });

  test(`should throw a validation error if fullname is longer than ${DATABASE.USER.MAX_FULLNAME} characters`, async () => {
    newUser.fullname = new Array(DATABASE.USER.MAX_FULLNAME + 1)
      .fill("1")
      .join("");
    await expect(new UserModel(newUser).validate()).rejects.toThrow();
  });

  test("should validate the password", async () => {
    const user = new UserModel(newUser);
    await user.save();
    expect(user.password).not.toEqual(newUser.password);
    expect(user.validatePassword(String(newUser.password))).toBeTruthy();
  });

  test("should genereate json web token", async () => {
    const user = new UserModel(newUser);
    const authJSON = user.toAuthJSON();
    await expect(authJSON.token).toBeDefined();
  });

  test("should fill createdAt & updatedAt", async () => {
    const user = new UserModel(newUser);
    await user.save();
    await expect(user.createdAt).toBeDefined();
    await expect(user.updatedAt).not.toBeDefined();
    await user.save();
    await expect(user.updatedAt).toBeDefined();
  });
});
