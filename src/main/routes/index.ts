import { Router } from 'express'

const router = Router()

router.post('/api/', (request, response) => {
	return response.send({
		message: `Hello World`,
	});
});

export default router;