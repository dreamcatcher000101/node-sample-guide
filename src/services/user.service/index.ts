import { Types } from "mongoose";

import { UserModel, IUser } from "../../models";

export const createUser = async (userData: IUser) => {
  const newUser = new UserModel(userData);
  await newUser.save();
  const user = newUser.toJSON();
  delete user.password;
  delete user.createdAt;
  return user;
};

export const readUsers = async (searchData: any) => {
  return await UserModel.find({ ...searchData, deletedAt: null });
};

export const updateUser = async (userId: Types.ObjectId, userData: any) => {
  await UserModel.updateOne(
    { _id: userId },
    { ...userData, updatedAt: new Date() }
  );
  return await readCertainUser(userId);
};

export const deleteUser = async (userId: Types.ObjectId) => {
  return await UserModel.updateOne({ _id: userId }, { deletedAt: new Date() });
};

export const readCertainUser = async (userId: Types.ObjectId) => {
  return UserModel.findOne({ _id: userId, deletedAt: null });
};

export const readEmailUserWithPassword = async (email: string) => {
  return UserModel.findOne(
    { email, deletedAt: null },
    {
      fullname: 1,
      email: 1,
      password: 1,
    }
  );
};
