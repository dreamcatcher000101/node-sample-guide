import { IUser, UserModel } from "models";

export const createUser = async (userData: IUser) => {
  const user = new UserModel({
    fullname: userData.fullname,
    email: userData.email,
    password: userData.password,
  });

  return user;
};

export const readUsers = async (userData: any) => {
  return await UserModel.find(
    {
      deletedAt: null,
      ...userData,
    },
    { password: 0 }
  );
};

export const readUser = async (
  userData: Pick<IUser, "id">
): Promise<IUser | null> => {
  const user: IUser | null = await UserModel.findOne(
    {
      deletedAt: null,
      id: userData.id,
    },
    { password: 0 }
  );

  return user;
};

export const updateUser = async () => {};

export const deleteUser = async () => {};

export const readCertainUser = async () => {};
