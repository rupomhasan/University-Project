import express from "express";
import { StudentController } from "./student.controller";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.get(
  "/",

  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentController.getAllStudents,
);

router.get(
  "/:studentId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  StudentController.getAStudent,
);

router.delete(
  "/:studentId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentController.deleteSingleStudent,
);
router.patch(
  "update-student/:studentId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentController.updateStudentIntoDB,
);

export const StudentRoutes = router;
