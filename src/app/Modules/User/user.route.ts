import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import { createStudentValidationSchema } from "../Student/student.zodValidation";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { createFacultyValidation } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../ Admin/admin.validationSchema";
import { auth } from "../../Middlewares/auth";
import { UserValidationSchema } from "./user.ZodValidation";
import { upload } from "../../Utils/sendImageToCloudinary";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(createFacultyValidation),
  userController.createFacultyIntoDB,
);
router.post(
  "/create-admin",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(createAdminValidationSchema),
  userController.createAdminIntoDB,
);

router.post(
  "/change-status/:id",
  auth("admin"),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth("admin"),
  ValidateRequest(UserValidationSchema.changeStatusValidationSchema),
  userController.changeStatus,
);

router.get(
  "/me",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  userController.getMe,
);

export const UserRoutes = router;
