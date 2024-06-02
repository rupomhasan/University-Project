import { z } from "zod";

const userZodSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password can not be more than 20 characters" })
    .min(6, { message: "password at list 6 char" })
    .optional(),
});

export const UserValidationSchema = userZodSchema;
 