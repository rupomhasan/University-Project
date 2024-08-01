import express from "express";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourserControllers } from "./offeredCourse.controllers";
const router = express.Router();

router.post(
  "/create",
  ValidateRequest(OfferedCourseValidations.createOfferedCourseSchema),
  OfferedCourserControllers.createOfferedCourse,
);

router.get("/", OfferedCourserControllers.getAllOfferedCourse);

router.get("/:id", OfferedCourserControllers.getSingleOfferedCourse);

router.patch(
  "/:id",
  ValidateRequest(OfferedCourseValidations.updateOfferedCourseSchema),
  OfferedCourserControllers.updateOfferedCourse,
);

router.delete("/:id", OfferedCourserControllers.deleteOfferedCourse);

export const OfferedCourseRouter = router;
