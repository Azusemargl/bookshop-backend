import { Request, Response } from 'express'
import dotenv from 'dotenv'
import User from '../models/User'
import Order from '../models/Order'
import CartProducts from '../models/CartProducts'

dotenv.config()

// TODO: Fix the unique order email

// Create a new order Controller
export const createOrderController = async (req: Request, res: Response) => {
   try {
      const { cartProductsId, userId, price, name, email, city, address, completed  } = req.body.order

      const cartProducts = await CartProducts.find({ '_id': { $in: cartProductsId } }, (err, data) => data)
      if (!cartProducts) return res.status(500).json({ error: 'Неккоректные данные' })

      const user = await User.findById(userId).populate("orders")
      if (!user) return res.status(500).json({ error: 'Неккоректные данные' })

      const newOrder = new Order({
         books: [...cartProducts],
         userId: userId,
         price: price,
         name: name,
         email: email,
         city: city,
         address: address,
         completed: completed
      })
      console.log(newOrder);
      
      await newOrder.save()

      user.orders = [...user.orders, newOrder]
      await user.save()

      return res.json([ ...user.orders, newOrder ])
   } catch (e) {
      console.log(e);
      
      return res.json({ error: `Server error: ${e}` })
   }
}

// Get all the orders Controller
export const getAllOrdersController = async (req: Request, res: Response) => {
   try {
      const { userId  } = req.body.order
      const orders = await Order.find({ 'userId': `${userId}` })

      return res.json([ ...orders ])
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}
