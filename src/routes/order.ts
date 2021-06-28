import { Router } from 'express'
import { createOrderController } from '../controllers/order.controller'

const router = Router()

router.post('/create', createOrderController)

export default router
