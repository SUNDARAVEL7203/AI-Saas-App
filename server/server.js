import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectDB from './configs/mongodb.js'

//Appp config
const PORT = process.env.PORT || 5000
const app = express()
connectDB()


//Initialize Middlewares
app.use(express.json())
app.use(cors())
//API Routes
app.get("/",(req,res) => {
    res.send("API Working")
})

app.listen(PORT, () => console.log("Server running on PORT " +PORT))