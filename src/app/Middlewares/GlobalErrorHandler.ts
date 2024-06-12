import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../Errors/handleZodError";
import config from "../config";
import handleValidationError from "../Errors/handleValidationError";
import handleCastError from "../Errors/handleCastError";
import handleDuplicateError from "../Errors/handleDuplicateError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 500;

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  }

  else if (err.name === 'CastError') {

    const simplifiedError = handleCastError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);

  } else if (err.errorResponse.code === 11000) {

    const simplifiedError = handleDuplicateError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);

  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ]
  }
  else if (err instanceof Error)
  {
    
     
    }


  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};
