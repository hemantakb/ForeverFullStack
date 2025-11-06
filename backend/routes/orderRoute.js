import express from 'express'
import { allOrder, placeOrder, placeOrderRozarpay, placeOrderStripe, updateStatus, userOrder, verifyRozarpay, verifyStripe } from '../controllers/orderControllers.js'
import adminAuth from '../middlewares/adminAuth.js'
import  authUser from '../middlewares/authUser.js'
const orderRoute=express.Router()


//Admin Features

orderRoute.post('/list',adminAuth,allOrder)
orderRoute.post('/update',adminAuth,updateStatus)

// payment features

orderRoute.post('/place',authUser,placeOrder)
orderRoute.post('/stripe',authUser,placeOrderStripe)
orderRoute.post('/rozorpay',authUser,placeOrderRozarpay)


//user fetures
orderRoute.post('/user',authUser,userOrder)
//verify
orderRoute.post('/verify',authUser,verifyStripe)
orderRoute.post('/verifyrozar',authUser,verifyRozarpay)

export default orderRoute;