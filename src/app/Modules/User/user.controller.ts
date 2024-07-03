import { userServices } from "./user.services";
import { sendResponse } from "../../Utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  //   const zodParsedData = StudentZodSchema.parse(studentData);
  const result = await userServices.createStudentIntoDB(password, student);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully ",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "User not available",
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
export const userController = {
  createStudent,
  createFacultyIntoDB,
};
