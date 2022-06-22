import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeNewAcccountController } from '../factories/controllers/account/new-account'

const router = Router()

router.post('/account', adaptRoute(makeNewAcccountController()))

export default router