import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../AcademicSemester/academicSemester.interface";
import { AcademicSemester } from "../AcademicSemester/academicSemester.model";
import { TStudent } from "../Student/student.interface";
import { Student } from "../Student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password is not given , use default password

  userData.password =
    password || (password = config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester 

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  // set generated id 


  const session = await mongoose.startSession()


  try {
    session.startTransaction()
    userData.id = await generateStudentId(admissionSemester)

    // create new user   
    const newUser = await User.create([userData], { session }); // build in

    // crate new student
    if (!newUser.length) {

      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent;
  } catch (err) {

    await session.abortTransaction()
    await session.endSession()
  }

};

export const userServices = {
  createStudentIntoDB,
};
