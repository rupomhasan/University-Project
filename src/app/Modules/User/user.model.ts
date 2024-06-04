import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import httpStatus from "http-status";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,

    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post("save", function (doc, next) {
  (doc.password = ""), next();
});



userSchema.pre("findOneAndUpdate", async function (next) {


  const query = this.getQuery()
  console.log(query)
  const result = await User.findOne({ _id: query })

  if (!result?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user available')
  }

  next()

})

export const User = model<TUser>("User", userSchema);
