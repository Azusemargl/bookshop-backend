import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import registerRoute from './routes/register'

const app = express()

// Config
dotenv.config()
const PORT = process.env.PORT || 5000
const DB = process.env.DB || ''

// Middlewears
app.use(express.json())
app.use(cors())

app.use('/api/auth', registerRoute)

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
