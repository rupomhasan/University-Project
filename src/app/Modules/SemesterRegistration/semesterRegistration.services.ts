import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { TSemesterRegistration } from "./semesterRegistration.Interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { AcademicSemester } from "../AcademicSemester/academicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`,
    );
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Semester is already registered",
    );
  }

  // check if the semester is exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academicSemester is not found",
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDb = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return { meta, result };
};

const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester is not found");
  }

  const currentSemesterRegistrationStatus =
    isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;
  if (currentSemesterRegistrationStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterRegistrationStatus}`,
    );
  }

  if (
    (currentSemesterRegistrationStatus === RegistrationStatus.UPCOMING &&
      requestedStatus === RegistrationStatus.ENDED) ||
    (currentSemesterRegistrationStatus === RegistrationStatus.ONGOING &&
      requestedStatus === RegistrationStatus.UPCOMING)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterRegistrationStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  return id;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
