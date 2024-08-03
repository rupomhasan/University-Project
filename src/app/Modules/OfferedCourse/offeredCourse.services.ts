import QueryBuilder from "../../builder/QueryBuilder";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";
import { AcademicDepartment } from "../AcademicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../AcademicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import { Student } from "../Student/student.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  const isCourseExists = await Course.findById(course);
  const isFacultyExists = await Faculty.findById(faculty);

  const academicSemester = isSemesterRegistrationExists?.academicSemester;
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "SemesterRegistration is not found",
    );
  }
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty is not found");
  }
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic Department is not found",
    );
  }
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found");
  }
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course is not found");
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`,
    );
  }

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exits!`,
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This faculty is not available at that time ! Choose other time or day ",
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate("semesterRegistration")
      .populate("academicFaculty")
      .populate("academicDepartment")
      .populate("course")
      .populate("faculty"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();
  return { meta, result };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);
  if (!offeredCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course not found");
  }
  return offeredCourse;
};

const getMyOfferedCourseFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  const student = await Student.findOne({ id });
  if (!student)
    throw new AppError(httpStatus.NOT_FOUND, "Student is not found");
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    {
      status: "ONGOING",
    },
  );
  if (!currentOngoingRegistrationSemester)
    throw new AppError(
      httpStatus.NOT_FOUND,
      "There is no ONGOING semesterRegistration available",
    );

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student.id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$semesterRegistration",
                      "$$currentOngoingRegistrationSemester",
                    ],
                  },
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourse",
      },
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student.id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isCompleted", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.course",
          },
        },
      },
    },

    {
      $addFields: {
        isPreRequisiteFulFiled: {
          $or: [
            { $eq: ["$course.preRequisiteCourse", []] },
            {
              $setIsSubset: [
                "$course.preRequisiteCourse.course",
                "$completedCourseIds",
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            "$course._id",
            {
              $map: {
                input: "$enrolledCourse",
                as: "enroll",
                in: "$$enroll.course",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisiteFulFiled: true,
      },
    },
  ];
  const paginationQuery = [{ $skip: skip }, { $limit: limit }];
  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  return id;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  getMyOfferedCourseFromDB,
};
