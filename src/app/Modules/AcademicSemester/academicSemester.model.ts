import { Schema, model } from "mongoose";

import {
  month,
  semesterCodeSchema,
  semesterNameSchema,
} from "./academicSemester.Const";
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { TAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterNameSchema,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCodeSchema,
    },
    startMonth: {
      type: String,
      required: true,
      enum: month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: month,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre("save", async function (next) {
  const isExistsSemester = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExistsSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester is  already exists",
    );
  }
  next();
});

academicSemesterSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicSemester.findOne({ _id: query });

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This Department does not exist");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
