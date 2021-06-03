import { Schema, model, Document } from "mongoose"
import validator from "validator"

export interface IUser extends Document {
   login: string
   email: string
   password: string
   avatar: string
   role: Array<string>
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
   role: {
      type: Array,
      default: "User"
   }
}, { timestamps: true })

const UserSchema = model<IUser>('User', User)

export default UserSchema
