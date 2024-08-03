import { USER_ROLE } from "../Modules/User/user.constant";
import { User } from "../Modules/User/user.model";

const superUser = {
  id: "0001",
  email: "khubaibm039@gmail.com",
  password: "superAdmin123",
  needPasswordChanged: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
