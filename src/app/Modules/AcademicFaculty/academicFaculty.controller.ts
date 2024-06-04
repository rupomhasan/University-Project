import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.services";

const createAcademicFacultyIntoDB = catchAsync(async (req, res, next) => {


    const facultyData = req.body

    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(facultyData)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic faculty successfully created",
        data: result
    })
})


const getAllAcademicFacultyIntoDB = catchAsync(async (req, res, next) => {




    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'fetched successfully',
        data: result
    })

})



const getSingleAcademicFacultyIntoDB = catchAsync(async (req, res, next) => {

    const result = await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(req.params.id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'fetched successfully',
        data: result
    })



})

const updateAcademicFacultyIntoDB = catchAsync(async (req, res, next) => {


    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(req.params.id, req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic faculty successfully updated",
        data: result
    })

})

export const AcademicFacultyController = {
    createAcademicFacultyIntoDB,
    updateAcademicFacultyIntoDB,
    getAllAcademicFacultyIntoDB,
    getSingleAcademicFacultyIntoDB
}