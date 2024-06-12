import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const getAllAcademicDepartmentFromDB = async () => {
  return await AcademicDepartment.find();
};

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id });

  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  return await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const AcademicDepartmentServices = {
  updateAcademicDepartmentIntoDB,
  createAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
};
