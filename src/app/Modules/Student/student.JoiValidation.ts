/* import Joi from "joi";

// UserName schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      "string.base": "First Name should be a type of text",
      "string.empty": "First Name is required",
      "string.min": "First Name should have a minimum length of {#limit}",
      "string.max": "First Name should have a maximum length of {#limit}",
      "string.pattern.base": "First Name must contain only letters",
    }),
  middleName: Joi.string().allow(""),
  lastName: Joi.string().trim().required().messages({
    "string.base": "Last Name should be a type of text",
    "string.empty": "Last Name is required",
  }),
});

// TGuardian schema
const TGuardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father Name is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father Contact Number is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father Occupation is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother Name is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother Contact Number is required",
  }),
});

// LocalTGuardian schema
const localTGuardianValidationSchema = Joi.object({
  name: Joi.string().allow(""),
  occupation: Joi.string().allow(""),
  address: Joi.string().allow(""),
});

// Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "object.base": "Name is required",
  }),
  roll: Joi.number().required().messages({
    "number.base": "Roll must be a number",
    "any.required": "Roll is required",
  }),
  department: Joi.string().required().messages({
    "string.empty": "Department is required",
  }),
  semester: Joi.string().required().messages({
    "string.empty": "Semester is required",
  }),
  group: Joi.string().required().messages({
    "string.empty": "Group is required",
  }),
  gender: Joi.string().valid("female", "male", "other").required().messages({
    "any.only": "{#value} is not a valid gender",
    "string.empty": "Gender is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact Number is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-")
    .messages({
      "any.only": "{#value} is not a valid blood group",
    }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent Address is required",
  }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present Address is required",
  }),
  TGuardian: TGuardianValidationSchema.required().messages({
    "object.base": "TGuardian is required",
  }),
  localTGuardian: localTGuardianValidationSchema.required().messages({
    "object.base": "Local TGuardian is required",
  }),
  profileImg: Joi.string().required().messages({
    "string.empty": "Profile Image is required",
  }),
  isActive: Joi.string().valid("active", "blocked").default("active").messages({
    "any.only": "{#value} is not a valid status",
  }),
});

// export default studentValidationSchema;
 */
