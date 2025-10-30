import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const signup = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Required field are missing"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User is already registered"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)

        await User.create({name,email,password:hashPassword})
        return res.status(201).json({
            success:true,
            message:"User registered successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in signup"
        })
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Required field are missing"
            })
        }

        let existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered with us"
            })
        }

        const matchPassword  = await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        const token = jwt.sign(
            {
                email:existingUser?.email,
                _id:existingUser?._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )

        const isProduction = process.env.NODE_ENV  === "production"
        const cookiesOption = {
            httpOnly:true,
            secure:isProduction,
            sameSite:isProduction?"None":"Lax",
            maxAge:7*24*60*60*1000,
            path:"/"
        }
        existingUser.password = undefined;

        return res.cookie("token",token,cookiesOption).status(200).json({
            success:true,
            message:"User Login Successfully",
            token,
            existingUser
        })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message :error.message || "Error in login"
        })
    }
}