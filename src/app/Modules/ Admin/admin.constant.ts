import { Schema } from "mongoose";
import { TBloodGroup, TGender, TUserName } from "../../Common/Types";

export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

export const BloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const Gender: TGender[] = ["male", "female", "other"];
export const AdminSearchAbleFields = [
  "email",
  "id",
  "contactNo",
  "emergencyContactNo",
  "name.firstName",
  "name.lastName",
  "name.lastName",
];
