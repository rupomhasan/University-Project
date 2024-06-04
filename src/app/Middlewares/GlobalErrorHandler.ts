import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let status = err.statusCode || 500;
    let message = err.message || 'Something Went Wrong'
    return res.status(status).json({
        success: false,
        message,
        err
    })
}