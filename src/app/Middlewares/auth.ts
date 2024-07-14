import jwt, { JwtPayload } from "jsonwebtoken";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../Utils/catchAsync";
import { AppError } from "../Errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import { TUserRoll } from "../Modules/User/user.interface";
import { User } from "../Modules/User/user.model";

export const auth = (...requiredRoles: TUserRoll[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your not authorized");
    }
    //verify a  token asymmetric
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    req.user = decoded;
    const { role, id, iat } = decoded;
    const user = await User.isUserExits(id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is  deleted");
    }

    const userStatus = user.status;
    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked");
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssueBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized hi!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!",
      );
    }

    next();
  });
};
