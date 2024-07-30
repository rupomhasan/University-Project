import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { notFoundRoute } from "./app/Middlewares/NotFoundRoute";
import { router } from "./app/Routes";
import globalErrorHandler from "./app/Middlewares/GlobalErrorHandler";

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// query

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
