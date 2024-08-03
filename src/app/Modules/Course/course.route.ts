import express from "express";
import { CourseControllers } from "./course.controller";
import { courseValidations } from "./course.validation";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getAllCourses,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);
router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getFacultiesWithCourse,
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete("/:id", auth("admin"), CourseControllers.deleteCourse);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.removeFacultiesFormCourse,
);
export const courseRoutes = router;
