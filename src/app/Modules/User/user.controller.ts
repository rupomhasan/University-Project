import { userServices } from "./user.services";
import { sendResponse } from "../../Utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  //   const zodParsedData = StudentZodSchema.parse(studentData);
  const result = await userServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Created Successfully ",
    data: result,
  });
});

const createFacultyIntoDB = catchAsync(async (req, res) => {
  const { password, faculty: FacultyData } = req.body;
  const result = await userServices.createFacultyIntoDB(password, FacultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});
const createAdminIntoDB = catchAsync(async (req, res) => {
  const { password, admin: AdminData } = req.body;
  const result = await userServices.createAdminIntoDB(password, AdminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});
export const userController = {
  createStudent,
  createFacultyIntoDB,
  createAdminIntoDB,
};
