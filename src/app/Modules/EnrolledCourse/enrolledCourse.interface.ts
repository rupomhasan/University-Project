import mongoose from "mongoose";

export type TGrade = "A" | "B" | "C" | "D" | "E" | "F" | "NA";

export type TEnrolledCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TEnrolledCourse = {
  semesterRegistration: mongoose.ObjectId;
  academicSemester: mongoose.ObjectId;
  academicFaculty: mongoose.ObjectId;
  academicDepartment: mongoose.ObjectId;
  offeredCourse: mongoose.ObjectId;
  course: mongoose.ObjectId;
  faculty: mongoose.ObjectId;
  student: string;
  isEnrolled: boolean;
  courseMarks: TEnrolledCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};
