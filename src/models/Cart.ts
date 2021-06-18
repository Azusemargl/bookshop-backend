import { IUser } from './User'
import { IBook } from './Book'
import { Schema, model, Document, Types } from "mongoose"
import { ICartProduct } from './CartProducts'

export interface ICart extends Document {
   user: IUser
   products: Array<ICartProduct>
}

const Cart: Schema = new Schema({
   user: { type: Types.ObjectId, ref: 'User', require: true },
   products: [{ type: Types.ObjectId, ref: 'CartProduct' }]
})

const CartSchema = model<ICart>('Cart', Cart)

export default CartSchema
