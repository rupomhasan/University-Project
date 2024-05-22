import { Aggregate, Schema, model } from 'mongoose';
import { TUserName, TStudent, TLocalTGuardian, TGuardian, TStudentModel } from './Student/student.interface';
import { required } from 'joi';
import bcrypt from 'bcryptjs'
import config from '../config';


const userNameSchema = new Schema<TUserName>(
    {
        firstName: {
            type: String, required: [true, 'First Name is required'],
            maxlength: [20, 'First name can not more then 20 characters'],
            minlength: [3, ''],
            trim: true,
            // custom validation
            // validate: function (value: string) {
            //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            //     const result = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            //     console.log(result)
            // }
        },
        middleName: { type: String },
        lastName: { type: String, required: [true, 'Last Name is required'] }
    }
)

const TGuardianSchema = new Schema<TGuardian>(
    {
        fatherName: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        motherName: { type: String, required: true },
        motherContactNo: { type: String, required: true },
        motherOccupation: { type: String, required: true }
    },
)

const LocalTGuardianSchema = new Schema<TLocalTGuardian>(
    {
        name: { type: String },
        occupation: { type: String },
        address: { type: String }
    }
)



const studentSchema = new Schema<TStudent, TStudentModel>({

    id: { type: String, unique: true, required: true },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    roll: { type: Number, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    group: { type: String, required: true },
    gender: {
        type: String,
        enum: {
            values: ["female", "male", "other"],
            //  way 1  :    // message: "The gender field can only be one of the following :'male,'female','other' "
            message: '{VALUE} is not valid'
        },
        required: true
    },
    contactNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", 'O-', "AB+", "AB-"],
    },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    TGuardian: { type: TGuardianSchema, required: true },

    localTGuardian: { type: LocalTGuardianSchema, required: true },
    profileImg: { type: String, required: true },
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: 'active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})
// creating a custom methods 

studentSchema.statics.isUserExists = async function (id: string) {
    const existingStudent = await StudentModel.findOne({ id })
    return existingStudent
}

// pre save middleware  / hook : will work an create() & save  ()

studentSchema.pre("save", async function (next) {

    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
})

// post save middleware / hook
studentSchema.post("save", function (doc, next) {
    doc.password = ''
    next()

})

// query middleware
studentSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

studentSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

// Aggregate
studentSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
})



// creating a custom methods 

// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingStudent = await StudentModel.findOne({ id })

//     return existingStudent
// }

export const StudentModel = model<TStudent, TStudentModel>('Student', studentSchema)