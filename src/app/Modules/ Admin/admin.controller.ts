/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AdminServices } from "./admin.services";

const getAllAdminFromDB = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAdminFromDB = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;

  const result = await AdminServices.getSingleAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

const updateAdminIntoDB = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(adminId, admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is updated Successfully",
    data: result,
  });
});

const deleteAdminFromDB = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is deleted successfully",
    data: result,
  });
});
export const AdminControllers = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
