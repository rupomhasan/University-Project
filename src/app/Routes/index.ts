import { Router } from "express";
import { UserRoutes } from "../Modules/User/user.route";
import { StudentRoutes } from "../Modules/Student/student.router";
import { AcademicSemesterRoutes } from "../Modules/AcademicSemester/academicSemester.route";

import { AcademicFacultyRoutes } from "../Modules/AcademicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../Modules/AcademicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../Modules/Faculty/faculty.route";

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
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);
