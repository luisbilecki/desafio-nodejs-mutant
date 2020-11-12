import { Request, Response, NextFunction } from 'express'

import userExternalAPI from '../services/user/api'

class UserController {
  async findAll (req: Request, res: Response, next: NextFunction) {
    const users = await userExternalAPI.fetchUsers()
    res.json(users)
  }

  async import (req: Request, res: Response, next: NextFunction) {

  }
}

export default new UserController()
