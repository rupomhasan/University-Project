import express from "express";
import { FacultyControllers } from "./faculty.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  FacultyControllers.getAllFaculty,
);
router.get(
  "/:facultyId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyControllers.getSingleFaculty,
);
router.patch(
  "/:facultyId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete(
  "/:facultyId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.deleteFaculty,
);

export const FacultyRoutes = router;
