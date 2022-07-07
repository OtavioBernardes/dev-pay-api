import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeNewLogin } from '../factories/controllers/user/login'

const router = Router()

router.post('/user/login', adaptRoute(makeNewLogin()))

export default router