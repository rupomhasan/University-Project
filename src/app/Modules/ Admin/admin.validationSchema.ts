import { z } from "zod";
import { createUserNameValidationSchema } from "../../Common/validation";
import { BloodGroup, Gender } from "./admin.constant";

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(28),
    admin: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
    }),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(28).optional(),
    admin: z.object({
      designation: z.string().optional(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});
