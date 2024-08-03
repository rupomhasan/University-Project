import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled successfully",
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled successfully",
    data: result,
  });
});
const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled courses are  retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getMyEnrolledCourses,
};
