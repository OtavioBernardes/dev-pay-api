import { Router } from 'express'
import AccountRouter from './account-routes'

const router = Router()

router.post('/api/', (request, response) => {
	return response.send({
		message: `Hello World`,
	});
});

router.use("/api/", AccountRouter)

export default router;