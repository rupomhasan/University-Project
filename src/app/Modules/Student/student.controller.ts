// import { student } from './sutdent.interface';
import { Request, Response } from "express";
import { StudentServices } from "./student.services";
// import Joi from "joi";
// import studentValidationSchema from "./student.validation";
import { z } from "zod";
import { StudentZodSchema } from "./student.zodValidation";
const createStudent = async (req: Request, res: Response) => {
    try {

        const { student: studentData } = req.body

        const zodParsedData = StudentZodSchema.parse(studentData)

        const result = await StudentServices.createStudentIntoDB(zodParsedData)

        console.log({ success: true })
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })

    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json(
            {
                success: false,
                message: 'something went wrong',
                error
            }
        )

    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {


        const result = await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: 'students are retrieved successfully',
            data: result
        })

    } catch (err) {
        console.log(err)
    }
}


const getAStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.studentId
        const result = await StudentServices.getAStudentFromDB(id)
        res.status(200).json({
            success: true,
            message: "student is retrieved successfully",
            data: result
        })
    } catch (error: any) {
        // console.log(error.message)
        res.status(500).json(
            {
                success: false,
                message: error.message || 'something went wrong',
                error
            }
        )
    }
}

const deleteSingleStudent = async (req: Request, res: Response) => {
    try {
        
        const id = req.params.studentId
        console.log(id)
        const result = await StudentServices.deleteSingleStudentFromDB(id)
        res.status(200).json({
            success: true,
            message: "User successfully removed",
            data: result
        })
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                message: error.message || 'something went wrong',
                error
            }
        )
    }
}

export const StudentController = {
    createStudent, getAllStudents, getAStudent, deleteSingleStudent
}