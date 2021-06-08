import { Request, Response } from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import User from '../models/User'

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

// Delete user avatar controller
export const deleteAvatarContoller = async (req: Request, res: Response) => {
   try {
      const { id } = req.body
      const user = await User.findById(id)

      if (!user) return res.status(400).json({ error: 'Пользователь не найден' })

      user.avatar = ''

      await user.save()

      fs.unlinkSync(`./public/images/${id}.jpg`)
      res.status(201).send({ error: "Image deleted" })
   } catch (e) {
      res.status(400).send({ error: "Error deleting image!" })
   }
}
