import { Schema, model, Document, Types } from "mongoose"

export interface IBook extends Document {
   name: string
   image: string
   rating: any
   review: number
   price: number
   past_price: number
   author: string
   publisher: string
   category: string
   year_of_issue: number
   cover_type: string
   number_of_pages: number
   age_restrictions: number
   description: string
   date: number
   sales: number
}

const Book: Schema = new Schema({
   name: { type: String, ref: "User", require: true },
   image: { type: String, data: Buffer },
   rating: { type: Types.ObjectId, ref: "Rating" },
   review: { type: Number, require: true },
   price: { type: Number, require: true },
   past_price: { type: Number },
   author: { type: String, require: true },
   publisher: { type: String, require: true },
   category: { type: String, require: true },
   year_of_issue: { type: Number, require: true },
   cover_type: { type: String, require: true },
   number_of_pages: { type: Number, require: true },
   age_restrictions: { type: Number },
   description: { type: String, require: true },
   date: { type: Number, default: new Date() },
   sales: { type: Number, default: 0 },
})

const BookSchema = model<IBook>('Book', Book)

export default BookSchema
