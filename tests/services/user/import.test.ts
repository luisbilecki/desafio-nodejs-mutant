import { Connection } from 'typeorm'
import nock from 'nock'

import UserImportService from '../../../src/services/user/import'

import users from '../../fixtures/users'

describe('Services > User > Import', () => {
  describe('constructor()', () => {
    it('should correct assign properties', () => {
      const userImportService = new UserImportService()

      expect(userImportService).toBeDefined()
      expect(userImportService.connection).toBeInstanceOf(Connection)
    })
  })

  describe('run()', () => {
    it('should return an error when external API is not available', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(404)

      const userImportService = new UserImportService()
      const importResult = await userImportService.run()

      expect(importResult.success).toBeFalsy()
      expect(importResult.error).toBeDefined()
    })

    it('should import user data', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(200, users)

      const userImportService = new UserImportService()
      const importResult = await userImportService.run()

      expect(importResult.success).toBeTruthy()
    })
  })
})
