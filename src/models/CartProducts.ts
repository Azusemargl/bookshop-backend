import { IUser } from './User'
import { IBook } from './Book'
import { Schema, model, Document, Types } from "mongoose"

export interface ICartProduct extends Document {
   book: IBook
   count: number
}

const CartProduct: Schema = new Schema({
   book: { type: Types.ObjectId, ref: 'Book' },
   count: { type: Number, default: 0 }
})

const CartProductSchema = model<ICartProduct>('CartProduct', CartProduct)

export default CartProductSchema
