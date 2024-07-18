import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const department = req.body;

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(department);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department successfully created ",
    data: result,
  });
});

const getAllAcademicDepartmentFromDB = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "fetched successfully",
    data: result,
  });
});

const getSingleAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  if (req.params.id) {
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDB(
        req.params.id,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "fetched successfully",
      data: result,
    });
  }
});

const updateAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedDepartment = req.body;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      id,
      updatedDepartment,
    );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department updated successfully",
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
};
