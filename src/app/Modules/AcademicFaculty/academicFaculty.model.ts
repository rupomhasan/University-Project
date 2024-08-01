import mongoose from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";

const academicFacultySchema = new mongoose.Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Define the model first
export const AcademicFaculty = mongoose.model<TAcademicFaculty>(
  "AcademicFaculty", // Ensure the model name matches the one used in population
  academicFacultySchema,
);

// Middleware for checking existence before saving
academicFacultySchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicFaculty.findOne({ name: this.name });

  if (isDepartmentExists) {
    throw new AppError(httpStatus.CONFLICT, "This faculty already exists");
  }

  next();
});

// Middleware for checking existence before updating
academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicFaculty.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty does not exist");
  }
  next();
});
