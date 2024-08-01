import express from "express";
import { StudentController } from "./student.controller";
import { auth } from "../../Middlewares/auth";
const router = express.Router();

router.get("/", StudentController.getAllStudents);

router.get(
  "/:studentId",
  auth("admin", "faculty"),
  StudentController.getAStudent,
);

router.delete(
  "/:studentId",
  auth("admin"),
  StudentController.deleteSingleStudent,
);
router.patch(
  "update-student/:studentId",
  auth("admin"),
  StudentController.updateStudentIntoDB,
);

export const StudentRoutes = router;
