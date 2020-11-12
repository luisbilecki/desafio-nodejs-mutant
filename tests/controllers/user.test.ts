import nock from 'nock'
import request from 'supertest'

import app from '../../api/app'

import users from '../fixtures/users'

describe('Controller > Users', () => {
  describe('GET /users/export', () => {
    it('should return an array of users', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(200, users)

      const res = await request(app)
        .get('/users/export')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject(users)
    })

    it('should return an error when external API fails', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(404)

      const res = await request(app)
        .get('/users/export')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(500)
    })
  })

  describe('POST /users/import', () => {})
})
