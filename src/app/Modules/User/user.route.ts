import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../Student/student.zodValidation";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { createFacultyValidation } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../ Admin/admin.validationSchema";

const router = express.Router();

router.post(
  "/create-student",
  ValidateRequest(studentValidations),
  userController.createStudent,
);

router.post(
  "/create-faculty",
  ValidateRequest(createFacultyValidation),
  userController.createFacultyIntoDB,
);
router.post(
  "/create-admin",
  ValidateRequest(createAdminValidationSchema),
  userController.createAdminIntoDB,
);

export const UserRoutes = router;
