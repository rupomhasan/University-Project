import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  return await AcademicFaculty.create(payload);
};

const getAllAcademicFacultyFromDB = async () => {
  return await AcademicFaculty.find();
};

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  return await AcademicFaculty.findOne({ _id: id });
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  return await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
};
