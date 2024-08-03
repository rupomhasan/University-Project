import { Request, Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.services";
import { sendResponse } from "../../Utils/sendResponse";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is created successfully",
      data: result,
    });
  },
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationServices.getAllSemesterRegistrationFromDb(
        req.query,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is created successfully",
      meta: result.meta,
      data: result.result,
    });
  },
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationServices.getSingleSemesterRegistrationIntoDB(
        id,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is created successfully",
      data: result,
    });
  },
);
const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is updated successfully",
      data: result,
    });
  },
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationServices.deleteSemesterRegistrationFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is updated successfully",
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
