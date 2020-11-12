import winston from 'winston'

const { combine, timestamp, label, printf } = winston.format

const logFormat = printf(({ level, message, label, timestamp }): string => {
  return `${timestamp} [${label}] [${level}]: ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'API' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/api.log' })
  ]
})

export default logger
