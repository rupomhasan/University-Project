/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { TBloodGroup, TGender, TUserName } from "../../Common/Types";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalTGuardian = {
  name: string;
  occupation: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalTGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};
// for creating  static
export interface TStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
