import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { academicFacultyValidation } from "./academicFaculty.Validation";

const router = express.Router();

router.post(
  "/create-faculty",
  AcademicFacultyController.createAcademicFacultyIntoDB,
);

router.get("/", AcademicFacultyController.getAllAcademicFacultyIntoDB);

router.get("/:id", AcademicFacultyController.getSingleAcademicFacultyIntoDB);

router.patch(
  "/update-faculty/:id",
  ValidateRequest(academicFacultyValidation),
  AcademicFacultyController.updateAcademicFacultyIntoDB,
);

export const AcademicFacultyRoutes = router;
