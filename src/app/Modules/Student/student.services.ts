import mongoose from "mongoose";
import { Student } from "./student.model";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchAbleFields } from "./student.constant";
import { AppError } from "../../Errors/AppError";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  /*  const queryObj = { ...query }
   let searchTerm = "";
   if (query?.searchTerm) {
     searchTerm = query?.searchTerm as string
   }
 
 
   const excludeFields = ['searchTerm', 'sort', "limit", 'page', "fields"]
   excludeFields.forEach((el) => delete queryObj[el])
 
   const SearchQuery = Student.find({
     $or: ['email', 'name.firstName', 'address'].map((field) => ({
       [field]: { $regex: searchTerm, $options: "i" }
     }))
   })
 
   const filterQuery = SearchQuery.find(queryObj).populate("user")
     .populate("admissionSemester")
     .populate({
       path: "academicDepartment",
       populate: {
         path: "academicFaculty",
       },
     });
 
   let sort = '-createdAt'
 
   if (query.sort) {
     sort = query.sort as string
   }
 
   const SortQuery = filterQuery.sort(sort)
   let limit = 1
   let page = 1
   let skip = 0
 
   query.limit ? limit = Number(query.limit) as number : limit = 1
   query.page ? (page = Number(query.page), skip = (page - 1) * limit) : (page = 1, skip = 0);
 
   const Pagination = SortQuery.skip(skip).limit(limit);
 
   let fields = "-_v";
 
   if (query.fields) {
     fields = (query.fields as string).split(',').join(' ')
   }
 
   const fieldsQuery = await Pagination.select(fields)
 
 
   // const result = await Pagination.
 
   return fieldsQuery; */

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("user")
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isStudentDeleted = await Student.findOneAndUpdate(
      { user: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!isStudentDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const isUserDeleted = await User.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!isUserDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return isStudentDeleted;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateStudentIntoDB,
};
