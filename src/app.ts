import express, { Application, NextFunction, Request, Response } from "express";
import { StudentRoutes } from "./app/Modules/Student/student.router";
import cors from "cors";
import { userRoutes } from "./app/Modules/User/user.route";
import { globalErrorHandler } from "./app/Middlewares/GlobalErrorHandler";
import { notFoundRoute } from "./app/Middlewares/NotFoundRoute";
import { router } from "./app/Routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// query

const myWord = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  next()
}


app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use(globalErrorHandler)
app.use(notFoundRoute)

export default app;
