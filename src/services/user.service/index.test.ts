import { faker } from "@faker-js/faker";

import setupTestDB from "../../setups/testDB.setup";

import { createUser, readUsers, updateUser, deleteUser } from ".";

import { IUser } from "../../models";

setupTestDB();

describe("User Service", () => {
  let user: IUser;

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
    const newUser = await createUser(user);
    const updatedUser = await updateUser(newUser._id, {
      fullname: faker.name.findName(),
    });
    expect(updatedUser?.fullname).not.toEqual(newUser.fullname);
  });

  test("should delete user", async () => {
    const newUser = await createUser(user);
    await deleteUser(newUser._id);
    const users = await readUsers({});
    expect(users).toHaveLength(0);
  });
});
