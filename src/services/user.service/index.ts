import { UserModel, IUser } from "../../models";

export const createUser = async (userData: IUser) => {
  const newUser = new UserModel(userData);
  return await newUser.save();
};

export const readUsers = async () => {};

export const updateUser = async () => {};

export const deleteUser = async () => {};

export const readCertainUser = async () => {};
