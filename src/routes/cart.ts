import { Router } from 'express'
import { getCartItemController, addCartItemController, removeCartItemController } from '../controllers/cart.controller'

const router = Router()

router.get('/get/:id', getCartItemController)
router.post('/add', addCartItemController)
router.post('/remove', removeCartItemController)

export default router
