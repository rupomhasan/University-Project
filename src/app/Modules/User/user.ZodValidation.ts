import { z } from "zod";
import { UserStatus } from "./user.constant";

const userZodSchema = z.object({
  id: z.string().optional(),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password can not be more than 20 characters" })
    .min(6, { message: "password at list 6 char" })
    .optional(),
  email: z.string().email(),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const UserValidationSchema = {
  userZodSchema,
  changeStatusValidationSchema,
};
