import axios, { AxiosInstance } from 'axios'

class UserExternalAPI {
  client: AxiosInstance

  constructor () {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000
    })
  }

  fetchUsers (): Promise<Object> {
    return this
      .client
      .get('/users')
      .then(res => res.data)
  }
}

export default new UserExternalAPI()
