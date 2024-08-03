import express from "express";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourserControllers } from "./offeredCourse.controllers";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.post(
  "/create",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(OfferedCourseValidations.createOfferedCourseSchema),
  OfferedCourserControllers.createOfferedCourse,
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  OfferedCourserControllers.getAllOfferedCourse,
);

router.get(
  "/my-offered-courses",
  auth(USER_ROLE.student),
  OfferedCourserControllers.getMyOfferedCourse,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourserControllers.getSingleOfferedCourse,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidateRequest(OfferedCourseValidations.updateOfferedCourseSchema),
  OfferedCourserControllers.updateOfferedCourse,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OfferedCourserControllers.deleteOfferedCourse,
);

export const OfferedCourseRouter = router;
