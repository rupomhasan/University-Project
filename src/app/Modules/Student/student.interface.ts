import { Model, Types } from "mongoose";

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

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
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
  gender: "male" | "female" | "other";
  contactNo: string;
  email: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  presentAddress: string;
  permanentAddress: string;
  TGuardian: TGuardian;
  localTGuardian: TLocalTGuardian;
  profileImg?: string;
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
