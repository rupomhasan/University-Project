import { Router } from "express";
import { userRoutes } from "../Modules/User/user.route";
import { StudentRoutes } from "../Modules/Student/student.router";

export const router = Router()


router.use('/students', StudentRoutes)

router.use('/users', userRoutes)