import express from "express";
import { AdminControllers } from "./admin.controller";
import ValidateRequest from "../../Middlewares/ValidateRequest";
import { updateAdminValidationSchema } from "./admin.validationSchema";
const router = express.Router();

router.get("/", AdminControllers.getAllAdminFromDB);
router.get("/:adminId", AdminControllers.getSingleAdminFromDB);
router.patch(
  "/:adminId",
  ValidateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdminIntoDB,
);
router.delete("/:adminId", AdminControllers.deleteAdminFromDB);

export const AdminRoutes = router;
