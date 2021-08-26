import { Schema, model, Document, Types } from "mongoose"
import { IBook } from './Book'

export interface IOrder extends Document {
   books: Array<{ book: IBook, count: number }>
   price: number
   userId: string | null
   name: string | null
   email: string | null
   city: string
   address: string
   completed: boolean
}

const Order: Schema = new Schema({
   books: [{
      book:   { type: Types.ObjectId, ref: "Book" },
      count:  { type: Number, default: 1 }
   }],
   price:     { type: Number, require: "Обязательное поле" },
   userId:    { type: String, require: "Обязательное поле" },
   name:      { type: String, require: "Обязательное поле" },
   email:     { type: String, require: "Обязательное поле" },
   city:      { type: String, required: "Обязательное поле" },
   address:   { type: String, required: "Обязательное поле" },
   completed: { type: Boolean, default: false }
}, { timestamps: true })

const OrderSchema = model<IOrder>('Order', Order)

export default OrderSchema
