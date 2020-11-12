import { Request, Response, NextFunction } from 'express'

import { HttpError } from './httpError'
import logger from '../services/logger'

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  const { status, name, message } =
    err instanceof HttpError
      ? err
      : HttpError.internalServerError(err)

  logger.error(message)

  res.status(status)
  res.json({
    name,
    message
  })
}
