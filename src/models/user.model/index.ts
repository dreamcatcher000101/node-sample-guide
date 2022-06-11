import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { model, Schema, Model, Document } from "mongoose";

import { JWT_SECRET, JWT_EXPIRE } from "../../config";

interface IUser {
  fullname?: string;
  email: string;
  password: string;
}

interface IUserAuthJSON {
  fullname: string;
  email: string;
}

interface IUserModel extends Document, IUser {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  setPassword(password: string): void;
  validatePassword(password: string): void;
  generateJWT(): string;
  toAuthJSON(): IUserAuthJSON;
}

const UserSchema: Schema = new Schema<IUserModel>({
  fullname: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

UserSchema.pre("save", function (next) {
  if (this.createdAt) {
    this.updatedAt = new Date();
  } else {
    this.createdAt = new Date();
  }

  next();
});

UserSchema.methods.setPassword = function (password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  this.password = hashedPassword;
};

UserSchema.methods.validatePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      id: this._id,
      fullname: this.fullname,
      email: this.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    fullname: this.fullname,
    email: this.email,
    token: this.generateJWT(),
  };
};

const UserModel: Model<IUserModel> = model("User", UserSchema);

export { IUser, IUserAuthJSON };

export default UserModel;
