/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { TBloodGroup, TGender, IUserName } from "../../Common/Types";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  designation: string;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>;
}
