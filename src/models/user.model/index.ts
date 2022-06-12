import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { model, Schema, Model, Document } from "mongoose";

import { JWT_SECRET, JWT_EXPIRE, DATABASE } from "../../config";

interface IUser {
  fullname?: string;
  email?: string;
  password?: string;
}

interface IUserAuthJSON {
  user: {
    fullname: string;
    email: string;
  };
  token: string;
}

interface IUserModel extends Document, IUser {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  validatePassword(password: string): boolean;
  generateJWT(): string;
  toAuthJSON(): IUserAuthJSON;
}

const UserSchema: Schema = new Schema<IUserModel>({
  fullname: {
    type: String,
    required: true,
    minlength: DATABASE.USER.MIN_FULLNAME,
    maxlength: DATABASE.USER.MAX_FULLNAME,
  },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, select: false },
  updatedAt: { type: Date, select: false },
  deletedAt: { type: Date, select: false },
});

UserSchema.pre("save", function (next) {
  if (this.createdAt) {
    this.updatedAt = new Date();
  } else {
    this.createdAt = new Date();
  }

  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

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
    user: {
      fullname: this.fullname,
      email: this.email,
    },
    token: this.generateJWT(),
  };
};

const UserModel: Model<IUserModel> = model("User", UserSchema);

export { IUser, IUserAuthJSON };

export default UserModel;
