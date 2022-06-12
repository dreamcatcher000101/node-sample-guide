import { faker } from "@faker-js/faker";
import { Types } from "mongoose";

import setupTestDB from "../../setups/testDB.setup";

import {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  readEmailUserWithPassword,
} from ".";

import { IUser } from "../../models";

setupTestDB();

describe("User Service", () => {
  let user: IUser;
  const userId: Types.ObjectId = new Types.ObjectId("000000000000000000000000");

  beforeEach(() => {
    user = {
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.lorem.word(),
    };
  });

  test("should create and return new user", async () => {
    const newUser = await createUser(user);
    expect(newUser).toHaveProperty("_id");
    expect(newUser).toHaveProperty("fullname");
    expect(newUser).toHaveProperty("email");
    expect(newUser.password).toBeUndefined();
  });

  test("should return filtered users", async () => {
    const users = await readUsers({});
    expect(users).toEqual([]);
  });

  test("should update and return updated user", async () => {
    const updatedUser = await updateUser(userId, {
      fullname: faker.name.findName(),
    });
    expect(updatedUser).toBeNull();
  });

  test("should delete user", async () => {
    const result = await deleteUser(userId);
    expect(result.modifiedCount).toEqual(0);
  });

  test("should return user with ", async () => {
    const emailUser = await readEmailUserWithPassword(String(user.email));
    expect(emailUser).toBeNull();
  });
});
