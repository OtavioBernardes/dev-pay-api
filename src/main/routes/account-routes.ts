import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreditAccountController } from '../factories/controllers/account/credit-account'
import { makeNewAcccountController } from '../factories/controllers/account/new-account'

const router = Router()

router.post('/account', adaptRoute(makeNewAcccountController()))
router.post('/account/credit', adaptRoute(makeCreditAccountController()))

export default router