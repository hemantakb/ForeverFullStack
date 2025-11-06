import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'


//App config
const app=express()
const port=process.env.PORT||4000
connectDB()
connectCloudinary()


//middelware
app.use(express.json())
app.use(cors())



//Api end points

app.get('/',(req,res,next)=>{
    res.send('This is server Code ')
})
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoute)



app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port} `);
    
})