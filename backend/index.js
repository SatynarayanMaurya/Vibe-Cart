import express from "express"
import { dbConnect } from "./config/db.js"
import dotenv from "dotenv"
import routes from "./routes/route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()

const app = express();
dbConnect()

app.use(cors({
    origin:"https://vibe-cart-hazel.vercel.app",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api',routes)

app.get("/",(req,res)=>{
    res.send(`<h1>Hello from Vibe Cart</h1>`)
})

app.listen(process.env.PORT || 4000,()=>{
    console.log("APP is running")
})



