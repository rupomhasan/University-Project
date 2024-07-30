import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

const forgot_passwordValidationSchema = z.object({
  body: z.object({
    id: z.string(),
  }),
});

const reset_passwordValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    newPassword: z.string(),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgot_passwordValidationSchema,
  reset_passwordValidationSchema,
};
