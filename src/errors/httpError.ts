import { serializeError } from 'serialize-error'

interface ErrorResponse {
  status: number,
  error: string,
  message: Object
}

export class HttpError {
  status: number
  name: string
  message: Object
  error: Error

  constructor (status: number, name: string, error: Error) {
    this.status = status
    this.name = name
    this.error = error
    this.message = serializeError(error)
  }

  static badRequest (err: Error): HttpError {
    return new this(400, 'Bad request', err)
  }

  static unProcessableEntity (err: Error): HttpError {
    return new this(422, 'Unprocessable entity', err)
  }

  static unAuthorized (err: Error): HttpError {
    return new this(401, 'Unauthorized', err)
  }

  static forbidden (err: Error): HttpError {
    return new this(403, 'Forbidden', err)
  }

  static notFound (err: Error): HttpError {
    return new this(404, 'Not Found', err)
  }

  static internalServerError (err: Error): HttpError {
    return new this(500, 'Internal Server Error', err)
  }

  toJSON (): ErrorResponse {
    return {
      status: this.status,
      error: this.name,
      message: this.message
    }
  }
}
