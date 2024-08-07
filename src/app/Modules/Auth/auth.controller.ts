import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AuthServices } from "./auth.services";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, ...other } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully",
    data: other,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordDate } = req.body;
  const result = await AuthServices.changePassword(req?.user, passwordDate);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password update successfully",
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token is retrieved successfully",
    data: result,
  });
});
const forgot_password = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await AuthServices.forgot_password(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ui link  is generated successfully",
    data: result,
  });
});
const reset_password = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.reset_Password(req.body, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User password is changed successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgot_password,
  reset_password,
};
