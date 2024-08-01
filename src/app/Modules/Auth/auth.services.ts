import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../Utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExits(payload.id);
  const isPasswordMatch = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is  deleted");
  }

  const userStatus = user.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked");
  }

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d",
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    "100d",
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExits(userData?.id);

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
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    { id: userData?.id, role: user?.role },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

const refreshToken = async (token: string) => {
  //verify a  token asymmetric
  const { id, iat } = verifyToken(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
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
    User.isJWTIssueBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized hi!");
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d",
  );
  return { accessToken };
};

const forgot_password = async (id: string) => {
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

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m",
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  console.log(resetUILink);
  sendEmail(user, resetUILink);
};

const reset_Password = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExits(payload.id);

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

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (decoded.id !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, "you are forbidden");
  }
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: decoded?.id, role: user?.role },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgot_password,
  reset_Password,
};
