import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from '../models/User'

dotenv.config()

// User registration controller
export const registerContoller = async (req: Request, res: Response) => {
   try {
      const { login, email, password } = req.body
      
      const candidate = await User.findOne({ email })

      if (candidate) return res.json({ error: 'User already exists' })

      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({ login, email, password: hashPassword })

      await user.save()

      return res.json({ message: 'User was created' })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// User login controller
export const loginController = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) return res.json({ loginError: 'User does not exist' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.json({ loginError: 'Password is not correct' })

      const token = jwt.sign(
         { user: user.id },
         `${process.env.SECRET_KEY}`,
         { expiresIn: '24h' }
      )

      const userData = {
         id:    user._id,
         login:  user.login,
         email: user.email,
         avatar: user.avatar,
         role: user.role
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
      
      if (!user) return res.json({ loginError: 'Authentication error' })

      const userData = {
         auth:  true,
         id:    user._id,
         login:  user.login,
         email: user.email,
         avatar: user.avatar,
         role: user.role
      }

      return res.json({ ...userData })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}
