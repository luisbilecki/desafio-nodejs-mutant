import axios, { AxiosInstance } from 'axios'

import { UserApi } from '../../types/user'

class UserExternalAPI {
  client: AxiosInstance

  constructor () {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000
    })
  }

  fetchUsers (): Promise<UserApi[]> {
    return this
      .client
      .get('/users')
      .then(res => res.data)
  }
}

export default new UserExternalAPI()
