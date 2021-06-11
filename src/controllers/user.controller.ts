import { Request, Response } from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import bcrypt from 'bcrypt'
import User from '../models/User'
import Book from '../models/Book'

dotenv.config()

// Add user avatar controller
export const avatarContoller = async (req: Request, res: Response) => {
   try {
      const file = req.file
      const { id } = req.body

      const user = await User.findById(id)

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

      user.avatar = file.filename

      await user.save()

      return res.json({ avatar: file.filename })
   } catch (e) {
      return res.status(500).json({ error: `Server error: ${e}` })
   }
}

// Add favorites books controller
export const favoritesBooksController = async (req: Request, res: Response) => {
   try {
      const { userId, bookId } = req.body

      const user = await User.findById({ _id: userId }).populate('favorites')
      const book = await Book.findById({ _id: bookId })

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })
      if (!book) return res.status(400).json({ error: 'Книга не найдена' })
      if (user.favorites.some(item => `${item._id}` === bookId)) return res.status(400).json({ error: 'Книга уже добавлена' })

      user.favorites.push(book)

      await user.save()

      return res.json([ ...user.favorites ])
   } catch (e) {
      return res.status(500).json({ error: `Server error: ${e}` })
   }
}

// Remove favorites books controller
export const removeFavoritesBooksController = async (req: Request, res: Response) => {
   try {
      const { userId, bookId } = req.body

      const user = await User.findById({ _id: userId }).populate('favorites')
      const book = await Book.findById({ _id: bookId })

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })
      if (!book) return res.status(400).json({ error: 'Книга не найдена' })

      const removed = user.favorites.filter(item => `${item._id}` !== bookId)
      user.favorites = removed

      user.save()
      return res.json([ ...user.favorites ])
   } catch (e) {
      return res.status(500).json({ error: `Server error: ${e}` })
   }
}

// Delete user avatar controller
export const deleteAvatarContoller = async (req: Request, res: Response) => {
   try {
      const { id } = req.body
      const user = await User.findById(id)

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

      user.avatar = ''

      await user.save()

      fs.unlinkSync(`./public/images/${id}.jpg`)
      res.status(200).send({ error: "Image deleted" })
   } catch (e) {
      res.status(500).send({ error: "Error deleting image!" })
   }
}

// Login update
export const loginUpdateController = async (req: Request, res: Response) => {
   try {
      const { id, login } = req.body
      const user = await User.findById(id)

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

      user.login = login

      await user.save()

      res.json({ login: login, message: "Логин изменен" })
   } catch (e) {
      return res.status(500).json({ error: `Server error: ${e}` })
   }
}

// Email update
export const emailUpdateController = async (req: Request, res: Response) => {
   try {
      const { id, email } = req.body
      const user = await User.findById(id)

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

      user.email = email

      await user.save()

      res.json({ email: email, message: "Логин изменен" })
   } catch (e) {
      return res.status(500).json({ error: `Server error: ${e}` })
   }
}

// Password update
export const passwordUpdateController = async (req: Request, res: Response) => {
   try {
      const { id, oldPasswod, password } = req.body
      const user = await User.findById(id)

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

      const isMatch = await bcrypt.compare(oldPasswod, user.password)
      if (!isMatch) return res.json({ message: 'Неправильный текущий пароль' })

      const hashPassword = await bcrypt.hash(password, 7)

      user.password = hashPassword

      await user.save()

      res.json({ message: "Пароль изменен" })
   } catch (e) {
      return res.status(500).json({ error: `Server error: ${e}` })
   }
}
