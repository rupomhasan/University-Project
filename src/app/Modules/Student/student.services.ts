import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getAStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteSingleStudentFromDB,
};
