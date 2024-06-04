import mongoose from "mongoose";
import { Student } from "./student.model";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("user").populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession()
  try {

    session.startTransaction()


    const isStudentDeleted = await Student.findOneAndUpdate({ user: id }, { isDeleted: true }, { new: true, session });

    if (!isStudentDeleted) {

      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const isUserDeleted = await User.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true, session })

    if (!isUserDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
    }

    console.log({ isUserDeleted, isStudentDeleted })


    await session.commitTransaction()
    await session.endSession()

    return isStudentDeleted;
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()

  }
};


const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {


  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true, runValidators: true
  })




  return result;
}
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB, updateStudentIntoDB
};
