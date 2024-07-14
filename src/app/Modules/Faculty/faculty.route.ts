import express from "express";
import { FacultyControllers } from "./faculty.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculty,
);
router.get("/:facultyId", FacultyControllers.getSingleFaculty);
router.patch(
  "/:facultyId",
  ValidateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
