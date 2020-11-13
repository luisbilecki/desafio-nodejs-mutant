import nock from 'nock'
import request from 'supertest'

import app from '../../src/app'

import users from '../fixtures/users'

describe('Controllers > User', () => {
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

  describe('POST /users/import', () => {
    it('should return success as true when import process run', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(200, users)

      const res = await request(app)
        .post('/users/import')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject({
        success: true
      })
    })

    it('should return an error when external API fails', async () => {
      nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(404)

      const res = await request(app)
        .post('/users/import')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject({
        success: false
      })
    })
  })
})
