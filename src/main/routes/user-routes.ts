import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { MakeLoginController } from '../factories/controllers/login'

const router = Router()

router.post('/user/login', adaptRoute(MakeLoginController()))

export default router