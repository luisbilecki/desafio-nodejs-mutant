const baseConfig = {
  entities: [
    'src/entity/**/*.ts'
  ],
  migrations: [
    'src/migration/**/*.ts'
  ],
  subscribers: [
    'src/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}

const isTest = process.NODE_ENV === 'test'
const databaseSuffix = process.env.NODE_ENV

module.exports = Object.assign(
  {},
  {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'HRrUdp9f',
    database: `mutant_${databaseSuffix}`,
    synchronize: true,
    logging: !isTest
  },
  baseConfig
)
