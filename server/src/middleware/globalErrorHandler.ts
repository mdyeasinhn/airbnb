/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { handleZodError } from '../error/handleZodError'
import handleCastError from '../error/handleCastError'
import handleValidationError from '../error/handleValidationError'
import { handleGenericError } from '../error/handleGenericError'
import AppError from '../error/appError'
import { handleDuplicateError } from '../error/handleDuplicate'



export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res)
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err)
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err)
  } else if (err?.code && err?.code === 11000) {
    handleDuplicateError(err, res)
  } else if (err instanceof Error) {
    handleGenericError(err, res)
  } else if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }
}