import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { AdminSearchAbleFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import { User } from "../User/user.model";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return { meta, result };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id: id });
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }

    const userId = deleteAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};
export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
