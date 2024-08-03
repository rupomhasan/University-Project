import express from "express";
import { auth } from "../../Middlewares/auth";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.Validation";
import { EnrolledCourseControllers } from "./enrolledCourse.controller";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  ValidateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.get(
  "/my-enrolled-courses",
  auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  "/update-enrolled-course-marks",
  auth(USER_ROLE.faculty),
  ValidateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
