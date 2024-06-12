import httpStatus from "http-status";
import { academicSemesterNameCodeMapper } from "./academicSemester.Const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async () => {
  return await AcademicSemester.find({});
};
const getSingleSemester = async (id: string) => {
  return await AcademicSemester.findOne({ _id: id });
};

const updateSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid Semester Code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getSingleSemester,
  getAllSemester,
  updateSemester,
};
