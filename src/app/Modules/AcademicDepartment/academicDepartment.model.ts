import mongoose from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";

const academicDepartmentSchema = new mongoose.Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicFaculty", // Ensure this matches the model name for AcademicFaculty
      required: true,
    },
  },
  { timestamps: true },
);

// Pre-hook to check if a department exists before updating
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists =
    await mongoose.models.AcademicDepartment.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This Department does not exist");
  }
  next();
});

// Register the model with the correct name
const AcademicDepartment = mongoose.model<TAcademicDepartment>(
  "AcademicDepartment", // Use a consistent and proper model name
  academicDepartmentSchema,
);

export { AcademicDepartment };
