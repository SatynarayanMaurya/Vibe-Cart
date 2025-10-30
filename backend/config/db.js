import mongoose from "mongoose"

export const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("Database connection successful"))
    .catch((error)=>{
        console.log("Database connection failed : ",error)
        process.exit(1)
    })
}