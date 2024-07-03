import mongoose, { Schema, model } from "mongoose";

import { FacultyModel, TFaculty } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";
import { TUserName } from "../../Common/Types";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters "],
  },
});

export const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImg: {
      type: String,
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "academicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
facultySchema.virtual("fullName").get(function () {
  return (
    this.name?.firstName +
    " " +
    this?.name?.middleName +
    " " +
    this.name?.lastName
  );
});

// filter out deleted documents
facultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("findOne", function (next) {
  this.find({ idDeleted: { $ne: true } });
  next();
});

facultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// checking if user is already exists !
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};
export const Faculty = model<TFaculty, FacultyModel>("Faculty", facultySchema);
