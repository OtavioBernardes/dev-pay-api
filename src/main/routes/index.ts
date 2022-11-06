import { Router } from 'express'
import AccountRouter from './account-routes'
import UserRouter from './user-routes'

const router = Router()

router.post('/api/', (_, response) => {
	return response.send({
		message: `Hello World`,
	});
});

router.use("/api/", AccountRouter)
router.use("/api/", UserRouter)

export default router;