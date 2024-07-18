/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  id: string;
  password: string;
  email: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TNewUser = {
  password: string;
  role: string;
  id: string;
};

export interface UserModel extends Model<IUser> {
  isUserExits(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssueBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssueTimeStamp: number,
  ): boolean;
}

export type TUserRoll = keyof typeof USER_ROLE;
