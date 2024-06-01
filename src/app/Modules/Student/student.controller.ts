import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.services";
import { sendResponse } from "../../Utils/sendResponse";
import catchAsync from '../../Utils/catchAsync';



const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully ",
    data: result

  })
})

const getAStudent = catchAsync(async (req, res, next) => {
  const id = req.params.studentId;
  const result = await StudentServices.getAStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully ",
    data: result

  })
});

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const id = req.params.studentId;
  const result = await StudentServices.deleteSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully ",
    data: result

  })
});

export const StudentController = {
  getAllStudents,
  getAStudent,
  deleteSingleStudent,
};
