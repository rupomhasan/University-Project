import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.services";

const createAcademicSemester = catchAsync(async (req, res, next) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester created successfully ",
        data: result
    })
})

const getAllSemester = catchAsync(async (req, res, next) => {

    let result;
    if (req.params.id) {
        result = await AcademicSemesterServices.getSingleSemester(req.params.id)
    }

    else {

        result = await AcademicSemesterServices.getAllSemester()
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "",
        data: result
    })

})



const updateSemester = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updatedSemester = req.body

    const result = await AcademicSemesterServices.updateSemester(id, updatedSemester)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester created successfully ",
        data: result
    })



})


export const AcademicSemesterController = {
    createAcademicSemester,
    getAllSemester,
    updateSemester
}