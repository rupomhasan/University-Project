import { z } from "zod";

// Validation schema for UserName
export const UserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

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
    password: z.string().max(20),
    student: z.object({
      name: UserNameValidationSchema,
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
      TGuardian: TGuardianValidationSchema,
      localTGuardian: LocalTGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
    })
  })
});

export const studentValidations = StudentValidationSchema;
