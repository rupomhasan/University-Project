import { Router } from "express";
import { UserRoutes } from "../Modules/User/user.route";
import { StudentRoutes } from "../Modules/Student/student.router";
import { AcademicSemesterRoutes } from "../Modules/AcademicSemester/academicSemester.route";

import { AcademicFacultyRoutes } from "../Modules/AcademicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../Modules/AcademicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../Modules/Faculty/faculty.route";
import { AdminRoutes } from "../Modules/ Admin/admin.route";
import { courseRoutes } from "../Modules/Course/course.route";
import { SemesterRegistrationRouter } from "../Modules/SemesterRegistration/semesterRegistration.route";
import { OfferedCourseRouter } from "../Modules/OfferedCourse/offeredCourse.route";
import { AuthRouter } from "../Modules/Auth/auth.route";
import { EnrolledCourseRoutes } from "../Modules/EnrolledCourse/enrolledCourse.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/semesterRegistration",
    route: SemesterRegistrationRouter,
  },
  {
    path: "/offered-course",
    route: OfferedCourseRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/enrolled-course",
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);
