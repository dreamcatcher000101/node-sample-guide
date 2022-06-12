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
  let fakeUserID: string = "111111111111111111111111";

  beforeEach(() => {
    user = {
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.lorem.word(),
    };
  });

  describe("POST /user : create new user", () => {
    it("should return created user with OK status", async () => {
      const res = await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.OK);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("_id");
      expect(res.body.user).toHaveProperty("fullname");
      expect(res.body.user).toHaveProperty("email");
    });

    it(`should return BAD_REQUEST status if fullname is shorter than ${DATABASE.USER.MIN_FULLNAME} characters`, async () => {
      user.fullname = new Array(DATABASE.USER.MIN_FULLNAME - 1)
        .fill("0")
        .join("");
      await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST);
    });

    it(`should return BAD_REQUEST status if fullname is longer than ${DATABASE.USER.MAX_FULLNAME} characters`, async () => {
      user.fullname = new Array(DATABASE.USER.MAX_FULLNAME + 1)
        .fill("0")
        .join("");
      await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return BAD_REQUEST status if email is existed", async () => {
      await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.OK);

      await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /user : read filtered user", () => {
    beforeEach(async () => {
      await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.OK);
    });

    it("should return all users with OK status", async () => {
      let res = await request(App)
        .get("/api/v1/users/user")
        .expect(httpStatus.OK);
      expect(res.body.users).toHaveLength(1);

      const filteredUser = res.body.users[0];
      expect(filteredUser.fullname).toEqual(user.fullname);
      expect(filteredUser.email).toEqual(user.email);
    });

    it("should return filtered users with OK status", async () => {
      const wrongFullname = user.fullname + "wrong";
      const res = await request(App)
        .get(`/api/v1/users/user?fullname=${wrongFullname}`)
        .expect(httpStatus.OK);
      expect(res.body.users).toHaveLength(0);
    });

    it(`should return BAD_REQUEST when search fullname is longer than ${DATABASE.USER.MAX_FULLNAME} characters`, async () => {
      const longFullname = new Array(DATABASE.USER.MAX_FULLNAME + 1)
        .fill("a")
        .join("");
      await request(App)
        .get(`/api/v1/users/user?fullname=${longFullname}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /user : update user", () => {
    it("should return updated user with OK status", async () => {
      let res = await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.OK);

      const updatedUser: IUser = {
        fullname: "updated" + user.fullname,
        email: "updated" + user.email,
        password: "updated" + user.password,
      };
      res = await request(App)
        .put(`/api/v1/users/user/${res.body.user._id}`)
        .send({ ...updatedUser })
        .expect(httpStatus.OK);

      expect(res.body.user.fullname).toEqual(updatedUser.fullname);
      expect(res.body.user.email).toEqual(updatedUser.email);
      expect(res.body.user.password).not.toEqual(updatedUser.password);
    });

    it("should return BAD_REQUEST status when user id is not validated", async () => {
      const updatedFullname = user.fullname + "updated";
      await request(App)
        .put("/api/v1/users/user/1")
        .send({ fullname: updatedFullname })
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return NOT_FOUND status when user id is not existed", async () => {
      const updatedFullname = user.fullname + "updated";
      await request(App)
        .put(`/api/v1/users/user/${fakeUserID}`)
        .send({ fullname: updatedFullname })
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /user : delete user", () => {
    it("should return OK status", async () => {
      let res = await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.OK);

      await request(App)
        .delete(`/api/v1/users/user/${res.body.user._id}`)
        .expect(httpStatus.OK);
    });

    it("should return BAD_REQUEST status when user id is not validated", async () => {
      await request(App)
        .delete("/api/v1/users/user/1")
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return NOT_FOUND status when user id is not existed", async () => {
      await request(App)
        .delete(`/api/v1/users/user/${fakeUserID}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /user/:id : read certain user", () => {
    it("should return user data with OK status", async () => {
      let res = await request(App)
        .post("/api/v1/users/user")
        .send({ ...user })
        .expect(httpStatus.OK);

      res = await request(App)
        .get(`/api/v1/users/user/${res.body.user._id}`)
        .expect(httpStatus.OK);

      expect(res.body.user.fullname).toEqual(user.fullname);
      expect(res.body.user.email).toEqual(user.email);
    });

    it("should return BAD_REQUEST status when user id is not validated", async () => {
      const updatedFullname = user.fullname + "updated";
      await request(App)
        .get("/api/v1/users/user/1")
        .send({ fullname: updatedFullname })
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return NOT_FOUND status when user id is not existed", async () => {
      const updatedFullname = user.fullname + "updated";
      await request(App)
        .get(`/api/v1/users/user/${fakeUserID}`)
        .send({ fullname: updatedFullname })
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
