import { Connection, getConnection, QueryRunner, Repository } from 'typeorm'

import { User } from '../../entity/user'
import { UserApi } from '../../types/user'

import logger from '../logger'

import userExternalAPI from './api'

interface UserImportResult {
  success: boolean,
  error?: string
}

class UserImport {
  connection: Connection

  constructor () {
    this.connection = getConnection()
  }

  private async importUser (user: User) {
    logger.info(`Initializing the import for user ${user.name}`)

    const { address, company } = user

    const queryRunner: QueryRunner = this.connection.createQueryRunner()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save(address)
      await queryRunner.manager.save(company)
      await queryRunner.manager.save(user)

      await queryRunner.commitTransaction()
    } catch (err) {
      logger.error(`Error during save user data on database. ${err}`)

      await queryRunner.rollbackTransaction()
    } finally {
      queryRunner.release()
    }
  }

  async run (): Promise<UserImportResult> {
    let usersFromApi: UserApi[] = []

    // Fetch data from external API
    try {
      logger.info('Fetching data from external api to import')
      usersFromApi = await userExternalAPI.fetchUsers()
    } catch (err) {
      const description = 'Failed import process. Users API error'
      logger.error(`${description}. ${err}`)

      return {
        error: description,
        success: false
      }
    }

    // Initialize each user with entity instance
    let usersInstances: User[] = usersFromApi.map(User.fromRestResponse)

    // Filter users staying in suites
    const filterCriteria = (user: User): boolean =>
      user.address.suite.includes('Suite')
    usersInstances = usersInstances.filter(filterCriteria)

    // Order users by name
    const compareNames = (a: User, b: User) => {
      return a.name.localeCompare(b.name)
    }
    usersInstances = usersInstances.sort(compareNames)

    const promises = usersInstances.map(this.importUser, this)
    await Promise.all(promises)

    return {
      success: true
    }
  }
}

export default UserImport
