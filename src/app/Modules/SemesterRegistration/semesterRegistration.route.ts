import express from "express";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationController } from "./semesterRegistration.controllers";
const router = express.Router();

router.post(
  "/create-semester",
  ValidateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get("/", SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  "/:id",
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  "/:id",
  ValidateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRouter = router;
