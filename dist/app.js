"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_router_1 = require("./app/Modules/Student/student.router");
const app = (0, express_1.default)();
app.use("/api/v1/students", student_router_1.StudentRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});
exports.default = app;
