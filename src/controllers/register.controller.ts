import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from '../models/User'
import Cart from '../models/Cart'

dotenv.config()

// User registration controller
export const registerContoller = async (req: Request, res: Response) => {
   try {
      const { login, email, password } = req.body
      
      const candidateByLogin = await User.findOne({ login })
      const candidateByEmail = await User.findOne({ email })

      if (candidateByLogin || candidateByEmail) return res.json({ message: 'Такой пользователь уже существует' })

      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({ login, email, password: hashPassword })
      await user.save()

      const cart = new Cart({ user: user._id })
      user.cart = cart
      
      await cart.save()
      await user.save()

      return res.json({ success: 'Пользователь создан' })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// User login controller
export const loginController = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) return res.json({ message: 'Неверный email или пароль' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.json({ message: 'Неверный email или пароль' })

      const token = jwt.sign(
         { user: user.id },
         `${process.env.SECRET_KEY}`,
         { expiresIn: '24h' }
      )

      const userData = {
         id:    user._id,
         login:  user.login,
         email: user.email,
         avatar: { photo: user.avatar },
         role: user.role,
         favorites: user.favorites,
         cart: user.cart._id,
         balance: user.balance,
         scores: user.scores,
      }

      return res.json({ ...userData, token })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Auth controller
export const authController = async (req: Request, res: Response) => {
   try {
      const { token } = req.body
      
      const userId = await jwt.verify(token, `${process.env.SECRET_KEY}`, (err: any, decoded: any) => decoded.user)
      const user = await User.findById(userId)
      const userFavorites = await User.findById(userId).populate('favorites')
      
      if (!user) return res.json({ error: 'Ошибка аутентификации' })

      const userData = {
         auth:  true,
         id:    user._id,
         login:  user.login,
         email: user.email,
         avatar: { photo: user.avatar },
         role: user.role,
         favorites: userFavorites?.favorites,
         cart: user.cart._id,
         balance: user.balance,
         scores: user.scores,
         createdAt: user.createdAt
      }

      return res.json({ ...userData })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}
