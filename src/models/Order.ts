import { Schema, model, Document, Types } from "mongoose"
import { IBook } from './Book'
import validator from "validator"

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
      book: { type: Types.ObjectId, ref: "Book" },
      count: { type: Number, default: 1 }
   }],
   userId: { type: String, require: "Обязательное поле" },
   price: { type: Number, require: "Обязательное поле" },
   name: { type: String, required: "Обязательное поле" },
   email: { type: String, require: "Обязательное поле", validate: [validator.isEmail, 'Invalid email'], unique: true },
   city: { type: String, required: "Обязательное поле" },
   address: { type: String, required: "Обязательное поле" },
   completed: { type: Boolean, default: false }
}, { timestamps: true })

const OrderSchema = model<IOrder>('Order', Order)

export default OrderSchema
