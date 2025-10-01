import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

export const handleZodError = (err: ZodError, res: Response) => {
  const issues = err.issues.map((val) => {
    return { path: val.path.join('.'), message: val.message }
  })

  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Validation Error',
    issues,
  })
}
