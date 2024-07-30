import { userServices } from "./user.services";
import { sendResponse } from "../../Utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await userServices.createStudentIntoDB(
    req.file,
    password,
    student,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Created Successfully ",
    data: result,
  });
});

const createFacultyIntoDB = catchAsync(async (req, res) => {
  const { password, faculty: FacultyData } = req.body;
  const result = await userServices.createFacultyIntoDB(
    req.file,
    password,
    FacultyData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});
const createAdminIntoDB = catchAsync(async (req, res) => {
  const { password, admin: AdminData } = req.body;
  const result = await userServices.createAdminIntoDB(
    req.file,
    password,
    AdminData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.changeStatus(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User status is updated",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { role, id } = req.user;

  const result = await userServices.getMe(role, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeStatus,
  getMe,
};
