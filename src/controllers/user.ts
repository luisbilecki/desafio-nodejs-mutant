import { Request, Response, NextFunction } from 'express'

import userExternalAPI from '../services/user/api'
import UserImportService from '../services/user/import'

class UserController {
  async findAll (req: Request, res: Response, next: NextFunction) {
    const users = await userExternalAPI.fetchUsers()
    res.json(users)
  }

  async import (req: Request, res: Response, next: NextFunction) {
    const userImportService: UserImportService = new UserImportService()
    const result = await userImportService.run()

    res.json(result)
  }
}

export default new UserController()
