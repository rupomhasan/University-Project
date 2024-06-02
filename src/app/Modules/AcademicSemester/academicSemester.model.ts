import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth, TSemesterCode, TSemesterName } from './academicSemester.interface';
import { month, semesterCodeSchema, semesterNameSchema } from "./academicSemester.Const";
import { string } from "joi";



const academicSemesterSchema = new Schema<TAcademicSemester>(

    {
        name: {
            type: String,
            required: true,
            enum: semesterNameSchema
        },
        year: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            enum: semesterCodeSchema
        },
        startMonth: {
            type: String,
            required: true,
            enum: month
        },
        endMonth: {
            type: String,
            required: true,
            enum: month
        }
    }, {
    timestamps: true
})

academicSemesterSchema.pre("save", async function (next) {
    const isExistsSemester = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    })
    if (isExistsSemester) {
        throw new Error('This academic semester is  already exists')
    }
    next()
})

export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)