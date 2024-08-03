/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { UserStatus } from "./user.constant";

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin", "superAdmin"],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post("save", function (doc, next) {
  (doc.password = ""), next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const result = await User.findById(query._id);
  if (result?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "No user available");
  }

  next();
});
userSchema.statics.isUserExits = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssueBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  jwtIssueTimeStamp: number,
) {
  const passwordChangeTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;

  return passwordChangeTime > jwtIssueTimeStamp;
};

export const User = model<IUser, UserModel>("User", userSchema);
