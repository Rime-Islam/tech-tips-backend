import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../Error/handleZodError";
import handleValidationError from "../Error/handleValidationError";
import handleCastError from "../Error/handleCastError";
import handleDuplicateError from "../Error/handleDuplicateError";
import AppError from "../Error/AppError";
import { TErrorSources } from "../interfase/error";
import config from "../config";





const globalErrorHandler: ErrorRequestHandler = (
    err, 
    req, 
    res, 
    next: NextFunction
  ): void => {  
    let statusCode = 500;
    let message = err || "Something went wrong";
  
    let errorSource: TErrorSources = [
      {
        path: "",
        message: "Something went wrong",
      },
    ];
  
    if (err instanceof ZodError) {
      const simplifiedError = handleZodError(err);
      message = simplifiedError?.message;
      statusCode = simplifiedError?.statusCode;
      errorSource = simplifiedError?.errorSources;
    } else if (err?.name === "ValidationError") {
      const simplifiedError = handleValidationError(err);
      message = simplifiedError?.message;
      statusCode = simplifiedError?.statusCode;
      errorSource = simplifiedError?.errorSources;
    } else if (err?.name === "CastError") {
      const simplifiedError = handleCastError(err);
      message = simplifiedError?.message;
      statusCode = simplifiedError?.statusCode;
      errorSource = simplifiedError?.errorSources;
    } else if (err?.name === 11000) {
      const simplifiedError = handleDuplicateError(err);
      message = simplifiedError?.message;
      statusCode = simplifiedError?.statusCode;
      errorSource = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
      message = err?.message;
      statusCode = err?.statusCode;
      errorSource = [{ path: "", message: err?.message }];
    } else if (err instanceof Error) {
      message = err?.message;
      errorSource = [{ path: "", message: err?.message }];
    }

    res.status(statusCode).json({
      success: false,
      message,
      errorSource,
      // stack: config.NODE_ENV == "development" ? err.stack : null,
    });
  
    return;
  };

export default globalErrorHandler;