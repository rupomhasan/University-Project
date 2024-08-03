import express from "express";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationController } from "./semesterRegistration.controllers";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.post(
  "/create-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getAllSemesterRegistration,
);
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRouter = router;
