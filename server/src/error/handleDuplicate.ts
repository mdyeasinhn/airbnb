import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface MongoDuplicateError extends Error {
  code: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyValue?: Record<string, any>;
}

export const handleDuplicateError = (err: MongoDuplicateError, res: Response) => {
  const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'Field';
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: `${field} already exists`,
  });
};
