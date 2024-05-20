"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const port = 3000;
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    port: process.env.PORT,
    database_Url: process.env.DATABASE_URL
};
