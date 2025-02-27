import 'dotenv/config'
import express from "express"
import cors from 'cors'
import { connectDB } from './configs/db.js'

const PORT = process.env.PORT || 5000
const app = express()
await connectDB()

//Initialize middlewares
app.use(express.json())
app.use(cors())





//API Routes
app.get('/', (req,res) => res.json({message: "Welcome"}))

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})