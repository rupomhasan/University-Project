/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";

import { AcademicSemester } from "../AcademicSemester/academicSemester.model";
import { TStudent } from "../Student/student.interface";
import { Student } from "../Student/student.model";
import { User } from "./user.model";

import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../AcademicDepartment/academicDepartment.model";
import { AppError } from "../../Errors/AppError";
import { Faculty } from "../Faculty/faculty.model";
import { TAdmin } from "../ Admin/admin.interface";
import { Admin } from "../ Admin/admin.model";
import { generateFacultyId } from "./Utils/generate.Faculty.ID";
import { generateAdminId } from "./Utils/generate.Admin.ID";
import { generateStudentId } from "./Utils/generate.Student.ID";
import { IUser } from "./user.interface";
import { sendImageToCloudinary } from "../../Utils/sendImageToCloudinary";

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<IUser> = {};
  // if password is not given , use default password

  userData.password =
    password || (password = config.default_password as string);

  // set student role
  userData.role = "student";
  userData.email = payload.email;

  // find academic semester

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester is not found");
  }
  // set generated id

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    // get uploaded profile-image url(cloudinary)
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);

      payload.profileImg = secure_url as string;
    }

    // console.log(payload.profileImg);

    // create new user
    const newUser = await User.create([userData], { session, new: true }); // build in

    // crate new student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id
    const newStudent = await Student.create([payload], { new: true, session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<IUser> = {};

  // Set default password if not provided
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";
  userData.email = payload.email;

  // Find academic department info
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
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url;
    }
    const newUser = await User.create([userData], { new: true, session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { new: true, session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    console.error("Error creating faculty:", err);
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<IUser> = {};

  userData.password = password || config.default_password;
  userData.role = "admin";
  userData.email = payload.email;

  // console.log("first", payload);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { new: true, session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // get uploaded profile-image url(cloudinary)
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);

      payload.profileImg = secure_url as string;
    }
    const newAdmin = await Admin.create([payload], { new: true, session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};
const changeStatus = async (
  id: string,
  payload: { status: "in-progress" | "blocked" },
) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getMe = async (role: string, id: string) => {
  let result;

  if (role === "student") {
    result = await Student.findOne({ id })
      .populate("admissionSemester")
      .populate("academicDepartment");
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id }).populate("academicDepartment");
  }
  if (role === "admin") {
    result = await Admin.findOne({ id });
  }

  return result;
};
export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
