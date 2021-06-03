import { Router } from 'express'
import { registerContoller, loginController, authController } from '../controllers/register.controller'

const router = Router()

router.post('/register', registerContoller)
router.post('/login', loginController)
router.post('/auth', authController)

export default router
