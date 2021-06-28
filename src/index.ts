import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import registerRoute from './routes/register'
import userRoute from './routes/user'
import bookRoute from './routes/book'
import cartRoute from './routes/cart'
import orderRoute from './routes/order'

const app = express()

// Config
dotenv.config()
const PORT = process.env.PORT || 5000
const DB = process.env.DB || ''

// Middlewears
app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.use('/api/auth', registerRoute)
app.use('/api/user', userRoute)
app.use('/api/books', bookRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

const start = async () => {
   try {
      await mongoose.connect(DB, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: true,
         useUnifiedTopology: true
      }, () => console.log(`Connection to DB`))
      app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}

start()
