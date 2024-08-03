import { auth } from "./../../Middlewares/auth";
import express from "express";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.post(
  "/login",
  ValidateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  "/change-password",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  "/refresh-token",
  ValidateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  "/forgot-password",
  ValidateRequest(AuthValidation.forgot_passwordValidationSchema),
  AuthControllers.forgot_password,
);
router.post(
  "/reset-password",
  ValidateRequest(AuthValidation.reset_passwordValidationSchema),
  AuthControllers.reset_password,
);

export const AuthRouter = router;
