import express from "express";
import { CourseControllers } from "./course.controller";
import { courseValidations } from "./course.validation";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { auth } from "../../Middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  auth("admin"),
  ValidateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get("/", CourseControllers.getAllCourses);

router.get(
  "/:id",
  auth("admin", "faculty", "student"),
  CourseControllers.getSingleCourse,
);

router.patch(
  "/:id",
  auth("admin"),
  ValidateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete("/:id", auth("admin"), CourseControllers.deleteCourse);

router.put(
  "/:courseId/assign-faculties",
  ValidateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  "/:courseId/remove-faculties",
  auth("admin"),
  ValidateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.removeFacultiesFormCourse,
);
export const courseRoutes = router;
