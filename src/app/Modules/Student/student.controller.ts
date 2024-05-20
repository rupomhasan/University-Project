import { student } from './sutdent.interface';
import { Request, Response } from "express";
import { StudentServices } from "./student.services";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body
        const result = await StudentServices.createStudentIntoDB(studentData)
        console.log({ success: true })
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })

    }
    catch (err) {
        console.log(err)
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


    }
    catch (err) {


        console.log(err)

    }



}

export const StudentController = {
    createStudent, getAllStudents, getAStudent
}