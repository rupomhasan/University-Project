import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { academicFacultyValidation } from "./academicFaculty.Validation";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/create-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicFacultyController.createAcademicFacultyIntoDB,
);

router.get("/", AcademicFacultyController.getAllAcademicFacultyIntoDB);

router.get("/:id", AcademicFacultyController.getSingleAcademicFacultyIntoDB);

router.patch(
  "/update-faculty/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(academicFacultyValidation),
  AcademicFacultyController.updateAcademicFacultyIntoDB,
);

export const AcademicFacultyRoutes = router;
