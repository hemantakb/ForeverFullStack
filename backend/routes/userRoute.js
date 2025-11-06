import express from 'express'
import { login,register,adminLogin } from '../controllers/userControllers.js'
const userRouter=express.Router()


userRouter.post('/login',login)
userRouter.post('/register',register)
userRouter.post('/adminLogin',adminLogin)


export default userRouter;