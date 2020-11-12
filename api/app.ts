import express, { Application } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import { isTest, isProduction } from './utils/env'
import LoggerStream from './services/loggerStream'
import errorHandler from './errors/handler'

const apiDocument: object = require('./swagger.json')

class App {
  server: Application

  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  private middlewares () {
    this.server.use(helmet())

    const corsOptions = {
      origin: isProduction() ? process.env.FRONTEND_URL : '*',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }

    this.server.use(cors(corsOptions))

    const morganFormat = isProduction() ? 'combined' : 'dev'

    if (!isTest()) {
      this.server.use(
        morgan(
          morganFormat,
          { stream: new LoggerStream() }
        ))
    }

    this.server.use(express.json())

    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocument))
  }

  private routes () {
    this.server.use(errorHandler)
  }
}

export default new App().server
