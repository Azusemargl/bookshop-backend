import { Schema, model, Document, Types } from "mongoose"
import { IBook } from './Book'
import { ICart } from "./Cart"
import validator from "validator"

export interface IUser extends Document {
   login: string
   email: string
   password: string
   avatar: string
   role: Array<string>
   balance: number
   scores: number
   favorites: Array<IBook>
   cart: ICart
   createdAt: Date
}

const User: Schema = new Schema({
   login: { type: String, required: "Обязательное поле" },
   email: { type: String, require: "Обязательное поле", validate: [validator.isEmail, 'Invalid email'], unique: true },
   password: { type: String, required: "Обязательное поле" },
   avatar: { type: String, data: Buffer },
   balance: { type: Number, default: 0 },
   scores: { type: Number, default: 0 },
   role: { type: Array, default: "User" },
   favorites: [{ type: Types.ObjectId, ref: "Book" }],
   cart: { type: Types.ObjectId, ref: "Cart" },
   created: { type: Date, default: new Date() }
}, { timestamps: true })

const UserSchema = model<IUser>('User', User)

export default UserSchema
