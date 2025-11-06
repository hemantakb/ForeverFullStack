import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../model/userModel.js'
import validator from 'validator'

 const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
 }

const login=async(req,res,next)=>{
 const {email,password}=req.body;

 try {
    const user=await userModel.findOne({email})
    if(!user) res.json({
        success:false,
        msg:"user dosen't exists"
    })
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch) return res.json({
        success:false,
        msg:"password dosen't match"
    })
    let token=generateToken(user._id)
    res.json({
        success:true,
        token
    })
 } catch (error) {
    console.log(error);
    res.json({
        success:false,
        msg:error.message
    })
    
 }

}

const register=async(req,res,next)=>{
     const {name,email,password}=req.body
     try {
        const exist=await userModel.findOne({email})
     if(exist) return res.json({success:false,msg:'user Already exists'})
        if(!validator.isEmail(email)){
            return res.json ({success:false,msg:'Enter a valid email'})
        }
        if(password.length <8){
            return res.json({
                success:false,
                msg:"Enter a strong passwors"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        const newUser=await userModel({
            name,
            email,
            password:hashPassword
        })
        const user =await newUser.save()

        const token = generateToken(user._id)
        res.json({
            success:true,
            token
        })
     } catch (error) {
        console.log(error);
        
        res.json({
            success:false,
            msg:error.message
        })
     }
    
}

const adminLogin=async(req,res,next)=>{
    try {
       const {email,password} =req.body
       if(email===process.env.Admin_Email && password===process.env.password){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({
            success:true,
            token
        })
       }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            msg:error.message
        })
        
    }
   
}

export {login,register,adminLogin}