import { Request, Response } from 'express'
import dotenv from 'dotenv'
import Book from '../models/Book'
import Cart from '../models/Cart'
import CartProduct from '../models/CartProducts'

dotenv.config()

// Get all the books
export const getCartItemController = async (req: Request, res: Response) => {
   try {
      const { id } = req.params

      const cart = await Cart.findById(id)
         .populate({
            path: 'products',
            populate: {
               path: 'book',
               model: 'Book'
            }
         })

      if (!cart) return res.status(500).json({ error: 'Неккоректные данные' })


      return res.json([...cart.products])
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Add cart item controller
export const addCartItemController = async (req: Request, res: Response) => {
   try {
      const { bookId, cartId } = req.body

      const book = await Book.findById(bookId)
      const cart = await Cart.findById(cartId)
         .populate({
            path: 'products',
            populate: {
               path: 'book',
               model: 'Book'
            }
         })

      if (!book || !cart) return res.status(500).json({ error: 'Неккоректные данные' })
      if (cart.products.some(item => `${item.book._id}` === bookId)) return res.status(400).json({ error: 'Товар уже в корзине' })

      const cartItem = new CartProduct({ book, count: 1 })
      await cartItem.save()

      cart.products.push(cartItem)
      await cart.save()

      return res.json([...cart.products])
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Remove cart item controller
export const removeCartItemController = async (req: Request, res: Response) => {
   try {
      const { bookId, cartId, cartProductId } = req.body

      const book = await Book.findById(bookId)
      const cart = await Cart.findById(cartId)
         .populate({
            path: 'products',
            populate: {
               path: 'book',
               model: 'Book'
            }
         })
      await CartProduct.findById(cartProductId).remove()

      if (!book || !cart) return res.status(500).json({ error: 'Неккоректные данные' })

      const removed = cart.products.filter(item => `${item.book._id}` !== bookId)
      cart.products = removed

      await cart.save()

      return res.json([...cart.products])
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Change cart item counter controller
export const changeCounterCartItemController = async (req: Request, res: Response) => {
   try {
      const { itemId, count } = req.body

      const item = await CartProduct.findById(itemId)

      if (!item) return res.status(500).json({ error: 'Неккоректные данные' })

      item.count = count
      await item.save()

      await item.save()

      return res.json({ id: itemId, count: item.count })
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}
