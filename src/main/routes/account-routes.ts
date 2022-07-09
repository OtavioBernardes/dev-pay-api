import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { MakeCreditAccountController } from '../factories/controllers/credit-account'
import { MakeNewAccountController } from '../factories/controllers/new-account'
import { auth } from '../middlewares/auth'

const router = Router()

router.post('/account', adaptRoute(MakeNewAccountController()))
router.post('/account/credit', auth, adaptRoute(MakeCreditAccountController()))

export default router