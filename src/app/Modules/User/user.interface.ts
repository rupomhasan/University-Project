export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TNewUser = {
  password: string;
  role: string;
  id: string;
};
