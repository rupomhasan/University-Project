import express from "express";
import { CourseControllers } from "./course.controller";
import { courseValidations } from "./course.validation";
import ValidateRequest from "../../Middlewares/ValidateRequest";

const router = express.Router();

router.post(
  "/create-course",
  ValidateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get("/", CourseControllers.getAllCourses);

router.get("/:id", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
  ValidateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete("/:id", CourseControllers.deleteCourse);

router.put(
  "/:courseId/assign-faculties",
  ValidateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  "/:courseId/remove-faculties",
  ValidateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.removeFacultiesFormCourse,
);
export const courseRoutes = router;
