import { StudentModel } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {


    // if (await StudentModel.isUserExists(studentData.id)) {
    //     throw new Error('User already exists ')
    // }
    const result = await StudentModel.create(studentData)   // build in static method



    // const student = new StudentModel(studentData);

    // if (await student.isUserExists(studentData.id)) {
    //     throw new Error("user already exists")
    // }

    // const result = await student.save()

    return result
}


const getAllStudentsFromDB = async () => {

    const result = await StudentModel.find({});
    console.log('reached') 
    return result

}

const getAStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id })
    return result
}

const deleteSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, { isDeleted: true })
    return result
}


export const StudentServices = {

    createStudentIntoDB,
    getAllStudentsFromDB,
    getAStudentFromDB,
    deleteSingleStudentFromDB

}