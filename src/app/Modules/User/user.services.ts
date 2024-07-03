import mongoose from "mongoose";
import config from "../../config";

import { AcademicSemester } from "../AcademicSemester/academicSemester.model";
import { TStudent } from "../Student/student.interface";
import { Student } from "../Student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../AcademicDepartment/academicDepartment.model";
import { AppError } from "../../Errors/AppError";
import { Faculty } from "../Faculty/faculty.model";
import { TAdmin } from "../ Admin/admin.interface";
import { Admin } from "../ Admin/admin.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password is not given , use default password

  userData.password =
    password || (password = config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set generated id

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    // create new user
    const newUser = await User.create([userData], { session }); // build in

    // crate new student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user Object

  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  // setRole
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "AcademicDepartment not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create faculty");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession;
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.password = password || config.default_password;
  userData.role = "admin";
  // console.log("first", payload);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = "A-0001";
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
