import express from "express";
import { StudentController } from "./student.controller";
const router = express.Router();

router.get("/", StudentController.getAllStudents);

router.get("/:studentId", StudentController.getAStudent);

router.delete("/:studentId", StudentController.deleteSingleStudent);

export const StudentRoutes = router;
