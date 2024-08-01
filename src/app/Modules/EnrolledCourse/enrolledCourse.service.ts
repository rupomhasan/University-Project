/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { OfferedCourse } from "../OfferedCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";
import mongoose from "mongoose";
import { Course } from "../Course/course.model";
import { Student } from "../Student/student.model";
import { Faculty } from "../Faculty/faculty.model";
import { calculateGradeAndPoint } from "./enrolledCourse.utils";

const createEnrolledCourseIntoDB = async (
  id: string,
  payload: TEnrolledCourse,
) => {
  const isOfferedCourseExist = await OfferedCourse.findById(
    payload.offeredCourse,
  );
  if (!isOfferedCourseExist)
    throw new AppError(httpStatus.NOT_FOUND, "Offered course is not found");
  if (isOfferedCourseExist.maxCapacity < 1)
    throw new AppError(httpStatus.CONFLICT, "Our room is full");

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse: payload.offeredCourse,
    student: id,
  });
  if (isStudentAlreadyEnrolled)
    throw new AppError(httpStatus.CONFLICT, "Student is already enrolled");

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select("maxCredit");

  const maxCredit = semesterRegistration?.maxCredit;

  const course = await Course.findById(isOfferedCourseExist.course);
  const currentCredit = course?.credits;
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  //  total enrolled credits + new enrolled course credit > maxCredit

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have exceeded maximum number of credits !",
    );

  // return enrolledCourses;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicDepartment,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: payload.offeredCourse,
          course: isOfferedCourseExist.course,
          faculty: isOfferedCourseExist.faculty,
          student: id,
          isEnrolled: true,
        },
      ],
      { session, new: true },
    );

    if (!result)
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to enroll in this course",
      );

    const maxCapacity = isOfferedCourseExist.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(payload.offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return enrolledCourses;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  id: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration not found !",
    );
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !");
  }
  const isStudentExists = await Student.findOne({ id: student });

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found !");
  }

  const faculty = await Faculty.findOne({ id }, { _id: 1 });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const isEnrolledCourseFaculty = await EnrolledCourse.findOne({
    faculty: faculty._id,
  });

  if (!isEnrolledCourseFaculty)
    throw new AppError(httpStatus.FORBIDDEN, "You can't update");

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden! !");
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(finalTerm * 0.5);

    const result = calculateGradeAndPoint(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty?._id,
    modifiedData,
    {
      new: true,
    },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
