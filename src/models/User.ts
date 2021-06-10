import { Schema, model, Document } from "mongoose"
import validator from "validator"

export interface IUser extends Document {
   login: string
   email: string
   password: string
   avatar: string
   role: Array<string>
   balance: number
   scores: number
   createdAt: Date
}

const User: Schema = new Schema({
   login: {
      type: String,
      required: "Обязательное поле",
   },
   email: {
      type: String,
      require: "Обязательное поле",
      validate: [validator.isEmail, 'Invalid email'],
      unique: true,
   },
   password: {
      type: String,
      required: "Обязательное поле",
   },
   avatar: {
      type: String,
      data: Buffer
   },
   balance: {
      type: Number,
      default: 0
   },
   scores: {
      type: Number,
      default: 0
   },
   role: {
      type: Array,
      default: "User"
   },
   created: {
      type: Date,
      default: new Date()
   }
}, { timestamps: true })

const UserSchema = model<IUser>('User', User)

export default UserSchema
