import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";

import setupTestDB from "../../setups/testDB.setup";
import { App } from "../../setups/backend.setup";

import { IUser } from "../../models";

import { DATABASE } from "../../config";

setupTestDB();

describe("User Route Endpoints", () => {
  let user: IUser;

  beforeEach(() => {
    user = {
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.lorem.word(),
    };
  });

  describe("POST /signup : sign up to server", () => {
    test("should return created user with OK status", async () => {
      const res = await request(App)
        .post("/api/v1/auth/signup")
        .send({ ...user })
        .expect(httpStatus.OK);
      expect(res.body.user).toHaveProperty("_id");
      expect(res.body.user.fullname).toEqual(user.fullname);
      expect(res.body.user.email).toEqual(user.email);
    });

    test("should return BAD_REQUEST status if email exists", async () => {
      await request(App)
        .post("/api/v1/auth/signup")
        .send({ ...user })
        .expect(httpStatus.OK);

      await request(App)
        .post("/api/v1/auth/signup")
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST);
    });

    test(`should return BAD_REQUEST status if fullname is shorter than ${DATABASE.USER.MIN_FULLNAME} characters`, async () => {
      user.fullname = new Array(DATABASE.USER.MIN_FULLNAME - 1)
        .fill("0")
        .join("");
      await request(App)
        .post("/api/v1/auth/signup")
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST);
    });

    test(`should return BAD_REQUEST status if fullname is longer than ${DATABASE.USER.MAX_FULLNAME} characters`, async () => {
      user.fullname = new Array(DATABASE.USER.MAX_FULLNAME + 1)
        .fill("0")
        .join("");
      await request(App)
        .post("/api/v1/auth/signup")
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /signin : sign in to server", () => {
    beforeEach(async () => {
      await request(App)
        .post("/api/v1/auth/signup")
        .send({ ...user })
        .expect(httpStatus.OK);
    });

    test("should return signed user with OK status", async () => {
      const res = await request(App)
        .post("/api/v1/auth/signin")
        .send({ ...user })
        .expect(httpStatus.OK);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.fullname).toEqual(user.fullname);
      expect(res.body.user.email).toEqual(user.email);
    });

    test(`should return BAD_REQUEST status if email does not exist`, async () => {
      await request(App)
        .post("/api/v1/auth/signin")
        .send({ ...user, email: "wrong" + user.email })
        .expect(httpStatus.BAD_REQUEST);
    });

    test(`should return BAD_REQUEST status if password is not validated`, async () => {
      await request(App)
        .post("/api/v1/auth/signin")
        .send({ ...user, password: "wrong" + user.password })
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
