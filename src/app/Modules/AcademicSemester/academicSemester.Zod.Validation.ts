import { z } from "zod";
import { month, semesterCodeSchema, semesterNameSchema } from "./academicSemester.Const";

const academicSemesterZodSchema = z.object({
    body: z.object({
        name: z.enum([...semesterNameSchema] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...semesterCodeSchema] as [string, ...string[]]),
        startMonth: z.enum([...month] as [string, ...string[]]),
        endMonth: z.enum([...month] as [string, ...string[]]),
    })
});


const updateAcademicSemesterZodSchema = z.object({
    body: z.object({
        name: z.enum([...semesterNameSchema] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        code: z.enum([...semesterCodeSchema] as [string, ...string[]]).optional(),
        startMonth: z.enum([...month] as [string, ...string[]]).optional(),
        endMonth: z.enum([...month] as [string, ...string[]]).optional(),
    })
});


export const AcademicSemesterValidations = { academicSemesterZodSchema, updateAcademicSemesterZodSchema };
