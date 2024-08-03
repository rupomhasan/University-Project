/* eslint-disable no-constant-binary-expression */
import httpStatus from "http-status";

import { StudentServices } from "./student.services";
import { sendResponse } from "../../Utils/sendResponse";
import catchAsync from "../../Utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all User",
    meta: result.meta,
    data: result.result,
  });
});

const getAStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "fetched Successfully ",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Student available",
      data: null,
    });
  }
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await StudentServices.deleteSingleStudentFromDB(id);

  if (!result === undefined) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted Successfully ",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "Student not available",
    data: null,
  });
});

const updateStudentIntoDB = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const { student } = req.body;

  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getAStudent,
  deleteSingleStudent,
  updateStudentIntoDB,
};
