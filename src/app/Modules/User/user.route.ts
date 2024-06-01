import express from "express";
import { userController } from "./user.controller";
import validateSchema from "../../Middlewares/ValidateRequest";
import { studentValidations } from "../Student/student.zodValidation";

const router = express.Router();

router.post("/create-student", validateSchema(studentValidations), userController.createStudent);

export const userRoutes = router;
