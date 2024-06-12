import express from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = express.Router();

router.get("/", AcademicDepartmentController.getAllAcademicDepartmentFromDB);

router.get(
  "/:id",
  AcademicDepartmentController.getSingleAcademicDepartmentIntoDB,
);

router.post(
  "/create-department",
  ValidateRequest(AcademicDepartmentValidation.academicDepartmentZodSchema),
  AcademicDepartmentController.createAcademicDepartmentIntoDB,
);

router.patch(
  "/update-department/:id",
  ValidateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartmentIntoDB,
);

export const AcademicDepartmentRoutes = router;
