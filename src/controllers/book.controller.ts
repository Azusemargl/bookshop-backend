import { Request, Response } from 'express'
import dotenv from 'dotenv'
import Book from '../models/Book'

dotenv.config()

// Get all the books
export const getBookContoller = async (req: Request, res: Response) => {
   try {
      const books = await Book.find()

      return res.json([...books])
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Get filtered books
export const getFilteredBookContoller = async (req: Request, res: Response) => {
   try {
      const { authors, genres } = req.body.filter

      const genresBook = Object.entries(req.body.filter).some(item => item[1])
         ? await Book.find({
            $and: [
               genres ? { 'category': { $in: genres.split(',') } } : {},
               authors ? { 'author': { $in: authors.split(',') } } : {},
            ]
         }, (_, data) => data)
         : await Book.find({})

      return res.json([...genresBook])
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Book creator controller
export const bookContoller = async (req: Request, res: Response) => {
   try {
      const {
         name, image, author, publisher, stars, review, price,
         past_price, category, number_of_pages, year_of_issue,
         cover_type, age_restrictions, description, date, sales
      } = req.body

      const book = new Book({
         name, image, author, publisher, stars,
         review, price, past_price, category,
         number_of_pages, year_of_issue, cover_type,
         age_restrictions, description, date, sales
      })

      await book.save()

      return res.json({ success: 'Товар создан' })
   } catch (e) {
      return res.json({ error: `Server error: ${e}` })
   }
}


// Types
type Query = {
   authors?: { $in: any; }
   genres?: { $in: any; }
}