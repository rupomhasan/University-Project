import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import ValidateRequest from '../../Middlewares/ValidateRequest';
import { AcademicSemesterValidations } from './academicSemester.Zod.Validation';

const router = express.Router()

router.post('/create-semester', ValidateRequest(AcademicSemesterValidations.academicSemesterZodSchema), AcademicSemesterController.createAcademicSemester)

router.get('/', AcademicSemesterController.getAllSemester)

router.get('/:id', AcademicSemesterController.getAllSemester)

router.patch('/update-semester/:id', ValidateRequest(AcademicSemesterValidations.updateAcademicSemesterZodSchema), AcademicSemesterController.updateSemester)

export const AcademicSemesterRoutes = router