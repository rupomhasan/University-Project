import express from "express";
import { FacultyControllers } from "./faculty.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);
router.get("/:facultyId", FacultyControllers.getSingleFaculty);
router.patch(
  "/:facultyId",
  ValidateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
