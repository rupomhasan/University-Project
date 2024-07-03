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
  name: TUserName;
  user: Types.ObjectId;
  roll: number;
  password: string;
  department: string;
  semester: string;
  group: string;
  gender: TGender;
  contactNo: string;
  email: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalTGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
// for creating  static
export interface TStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for crating instance

// export type TStudentMethod = {
//     isUserExists(id: string): Promise<TStudent | null>
// }

// export type TStudentModel = Model<TStudent, {}, TStudentMethod>;
