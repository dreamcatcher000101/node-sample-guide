import { UserModel } from "models";

export const createUser = async () => {};

export const readUsers = async (userData: any) => {
  return await UserModel.find(
    {
      deletedAt: null,
      ...userData,
    },
    { password: 0 }
  );
};

export const updateUser = async () => {};

export const deleteUser = async () => {};

export const readCertainUser = async () => {};
