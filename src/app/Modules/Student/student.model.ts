import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalTGuardian,
  TStudent,
  TStudentModel,
} from "./student.interface";
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { TUserName } from "../../Common/Types";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    maxlength: [20, "First name can not more then 20 characters"],
    minlength: [3, ""],
    trim: true,
    // custom validation
    // validate: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     const result = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    //     console.log(result)
    // }
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, "Last Name is required"] },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localTGuardianSchema = new Schema<TLocalTGuardian>({
  name: { type: String },
  occupation: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    name: { type: userNameSchema, required: [true, "Name is required"] },
    gender: {
      type: String,
      enum: {
        values: ["female", "male", "other"],
        message: "{VALUE} is not valid",
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },

    localGuardian: {
      type: localTGuardianSchema,
      required: [true, "LocalGuardian information is required"],
    },
    profileImg: { type: String, default: "" },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
// creating a custom methods

studentSchema.statics.isUserExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

// pre save middleware  / hook : will work an create() & save  ()
/* 
studentSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
}); */

// post save middleware / hook
/* studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
 */
// query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Aggregate
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const result = await Student.findOne({ user: query });

  if (!result?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "");
  }

  next();
});

// creating a custom methods

// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingStudent = await StudentModel.findOne({ id })

//     return existingStudent
// }

studentSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

export const Student = model<TStudent, TStudentModel>("Student", studentSchema);
