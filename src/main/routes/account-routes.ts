import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { MakeCreditAccountController } from '../factories/controllers/credit-account'
import { MakeGetBalanceController } from '../factories/controllers/get-balance'
import { MakeNewAccountController } from '../factories/controllers/new-account'
import { auth } from '../middlewares/auth'

const router = Router()

router.post('/account', adaptRoute(MakeNewAccountController()))
router.post('/account/credit', auth, adaptRoute(MakeCreditAccountController()))
router.get('/account/:accountId/balance', auth, adaptRoute(MakeGetBalanceController()))

export default router