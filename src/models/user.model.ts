import {
  model,
  Schema,
  Model,
  Document,
  PreSaveMiddlewareFunction,
} from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel: Model<IUser> = model("User", UserSchema);

export { IUser };

export default UserModel;
