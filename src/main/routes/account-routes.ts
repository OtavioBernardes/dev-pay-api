import {Router} from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'

const router = Router()

router.post('/account', () => {console.log('New Account')})

export default router