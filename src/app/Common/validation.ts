import { z } from "zod";

export const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(4)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "first name must start with a capital letter",
    }),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
});

export const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});
