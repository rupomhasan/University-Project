import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../Student/student.zodValidation";
import ValidateRequest from "../../Middlewares/ValidateRequest";

const router = express.Router();

router.post(
  "/create-student",
  ValidateRequest(studentValidations),
  userController.createStudent,
);

export const UserRoutes = router;
