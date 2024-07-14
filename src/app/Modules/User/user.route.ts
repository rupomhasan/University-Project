import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../Student/student.zodValidation";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { createFacultyValidation } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../ Admin/admin.validationSchema";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
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
