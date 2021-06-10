import { Schema, model, Document, Types } from "mongoose"

export interface IBook extends Document {
   name: string
   image: string
   author: string
   rating: any
   review: number
   price: number
   past_price: number
   category: string
   year_of_issue: number
   date: number
   sales: number
}

const Book: Schema = new Schema({
   name: { type: String, ref: "User", require: true },
   image: { type: String, data: Buffer },
   author: { type: String, require: true },
   rating: { type: Types.ObjectId, ref: "Rating" },
   review: { type: Number, require: true },
   price: { type: Number, require: true },
   past_price: { type: Number },
   category: { type: String, require: true },
   year_of_issue: { type: Number, require: true },
   date: { type: Number, default: new Date() },
   sales: { type: Number, default: 0 },
})

const BookSchema = model<IBook>('Book', Book)

export default BookSchema
