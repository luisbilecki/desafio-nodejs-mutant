import dotenv from 'dotenv'
import { createConnection } from 'typeorm'

import app from './app'
import logger from './services/logger'

dotenv.config()

const PORT: number = parseInt(process.env.PORT!) || 8000

createConnection().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
  })
})
