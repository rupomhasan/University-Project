import { Router } from "express";
import { UserRoutes } from "../Modules/User/user.route";
import { StudentRoutes } from "../Modules/Student/student.router";
import { AcademicSemesterRoutes } from "../Modules/AcademicSemester/academicSemester.route";

export const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    }

]

moduleRoutes.forEach((moduleRoute) => router.use(moduleRoute.path, moduleRoute.route))