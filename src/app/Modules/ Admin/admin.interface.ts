/* eslint-disable no-unused-vars */
import { Date, Model, Types } from "mongoose";
import { TGender, TUserName, TBloodGroup } from "../../Common/Types";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dataOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};
export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
