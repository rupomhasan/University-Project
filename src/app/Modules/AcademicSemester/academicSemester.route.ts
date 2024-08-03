import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { AcademicSemesterValidations } from "./academicSemester.Zod.Validation";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/create-semester",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  ValidateRequest(AcademicSemesterValidations.academicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester,
);

router.get("/", AcademicSemesterController.getAllSemester);

router.get("/:id", AcademicSemesterController.getAllSemester);

router.patch(
  "/update-semester/:id",
  ValidateRequest(AcademicSemesterValidations.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
);

export const AcademicSemesterRoutes = router;
