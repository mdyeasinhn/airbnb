import { NextFunction, Request, RequestHandler, Response } from 'express'

// catchAsync is a higher-order function (wrapper) for async route handlers
// It removes the need to write try/catch in every controller
const catchAsync = (fu: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Run the async function (controller) and handle its result
    Promise.resolve(fu(req, res, next))
      // If an error happens inside the controller, pass it to Express error handler
      .catch((error) => next(error))
  }
}

export default catchAsync
