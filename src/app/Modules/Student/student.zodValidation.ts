import { z } from "zod";
import { createUserNameValidationSchema } from "../../Common/validation";

// Validation schema for TGuardian
export const TGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

// Validation schema for LocalTGuardian
export const LocalTGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  address: z.string(),
});

// Validation schema for Student
export const StudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      roll: z.number(),
      department: z.string(),
      semester: z.string(),
      group: z.string(),
      gender: z.enum(["female", "male", "other"]),
      contactNo: z.string(),
      email: z.string().email(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      guardian: TGuardianValidationSchema,
      localGuardian: LocalTGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

export const studentValidations = StudentValidationSchema;
