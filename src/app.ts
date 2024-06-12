import express, { Application, Request, Response } from "express";

import cors from "cors";
import { globalErrorHandler } from "./app/Middlewares/GlobalErrorHandler";
import { notFoundRoute } from "./app/Middlewares/NotFoundRoute";
import { router } from "./app/Routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// query

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
