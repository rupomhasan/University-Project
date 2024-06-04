import { NextFunction, Request, RequestHandler, Response, } from "express";
import { userServices } from "./user.services";
import { sendResponse } from "../../Utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";




const createStudent = catchAsync(async (req, res, next) => {
    const { password, student } = req.body;

    //   const zodParsedData = StudentZodSchema.parse(studentData);
    const result = await userServices.createStudentIntoDB(password, student);

    if (result) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User Created Successfully ",
            data: result

        })
    }


    sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not available",
        data: null

    })
});

export const userController = {
    createStudent,
};
