import express from "express";
import { auth } from "../../Middlewares/auth";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.Validation";
import { EnrolledCourseControllers } from "./enrolledCourse.controller";
const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  ValidateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);
router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  ValidateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
