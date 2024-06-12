import {
  TAcademicSemesterNameCodeMapper,
  TMonth,
  TSemesterCode,
  TSemesterName,
} from "./academicSemester.interface";

export const month: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const semesterCodeSchema: TSemesterCode[] = ["01", "02", "03"];
export const semesterNameSchema: TSemesterName[] = ["Autumn", "Summer", "Fall"];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
