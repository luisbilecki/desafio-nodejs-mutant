import express, { Router } from 'express'
import usersController from '../controllers/user'

const router: Router = express.Router()

router.get(
  '/export',
  usersController.findAll
)

router.post(
  '/import',
  usersController.import
)

export default router
