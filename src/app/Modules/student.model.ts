import { Schema, model, connect } from 'mongoose';
import { UserName, Student, Guardian, LocalGuardian } from './Student/student.interface';



const userNameSchema = new Schema<UserName>(
    {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true }
    }
)

const guardianSchema = new Schema<Guardian>(
    {
        fatherName: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        motherName: { type: String, required: true },
        motherContactNo: { type: String, required: true },
    },
)

const LocalGuardianSchema = new Schema<LocalGuardian>(
    {
        name: { type: String },
        occupation: { type: String },
        address: { type: String }
    }
)



const studentSchema = new Schema<Student>({

    id: { type: String },
    name: userNameSchema,
    roll: { type: Number, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    group: { type: String, required: true },
    gender: ["female", "male"],
    contactNo: { type: String, required: true },
    email: { type: String, required: true },
    bloodGroup: ["A+", "A-", "B+", "B-", "O+", 'O-', "AB+", "AB-"],
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    guardian: guardianSchema,

    localGuardian: LocalGuardianSchema,
    profileImg: { type: String, required: true },
    isActive: ["active", "in"]
})
export const StudentModel = model<Student>('Student', studentSchema)