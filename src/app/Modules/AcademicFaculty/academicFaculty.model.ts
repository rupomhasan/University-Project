import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import httpStatus from "http-status";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String, required: true
    }
}, { timestamps: true })




academicFacultySchema.pre("save", async function (next) {

    const isDepartmentExists = await AcademicFaculty.findOne({ name: this.name })

    if (isDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This faculty is already exist")
    }

    next()

})


academicFacultySchema.pre("findOneAndUpdate", async function (next) {

    const query = this.getQuery()
    const isDepartmentExists = await AcademicFaculty.findOne({ _id: query })

    if (!isDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This faculty does not exist')
    }
    next()
})




export const AcademicFaculty = model<TAcademicFaculty>("academicFaculty", academicFacultySchema) 