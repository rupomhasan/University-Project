import config from "../../config";
import { TAcademicSemester } from "../AcademicSemester/academicSemester.interface";
import { AcademicSemester } from "../AcademicSemester/academicSemester.model";
import { TStudent } from "../Student/student.interface";
import { Student } from "../Student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password =
    password || (password = config.default_password as string);

  userData.role = "student";



  // find academic semester 

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  // set generated id 

  userData.id = await generateStudentId(admissionSemester)



  // create new user   
  const newUser = await User.create(userData); // build in

  // crate new student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
