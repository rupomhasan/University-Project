"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true }
});
const TGuardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});
const LocalTGuardianSchema = new mongoose_1.Schema({
    name: { type: String },
    occupation: { type: String },
    address: { type: String }
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String },
    name: userNameSchema,

    roll: { type: Number, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    group: { type: String, required: true },
    gender: ["female", "male"],
    contactNo: { type: String, required: true },
    email: { type: String, required: true },
    bloodGroup: ["A+", "A-", "B+", "B-", "O+", 'O-', "AB+", "AB-"],
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    TGuardian: TGuardianSchema,
    localTGuardian: LocalTGuardianSchema,
    profileImg: { type: String, required: true },
    isActive: ["active", "in"]
});
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
