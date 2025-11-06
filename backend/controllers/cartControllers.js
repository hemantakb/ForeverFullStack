import userModel from "../model/userModel.js";

 

const addToCart=async(req,res,next)=>{

    try {
        const {userId,itemId,size}=req.body;
      const userData=await userModel.findById(userId)
      const cartData=await userData.cartData
      if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1
        }else{
            cartData[itemId][size]=1
        }
      }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
      }

      await userModel.findByIdAndUpdate(userId,{cartData})
      res.status(201).json({success:true,message:'Product added to cart succesfully'})

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,message:'Unable to fetch the cart data'
        })
        
    }

}

const updateCart=async(req,res,next)=>{
    try {
        const {userId,itemId,size,quantity}=req.body
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData
      
        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(201).json({
            success:true,
            message:"Product updated successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,message:'Unable to fetch the cart data'
        })
    }

}

const getCart=async(req,res,next)=>{
try {
    const {userId}=req.body
const userData=await userModel.findById(userId)
const cartData=await userData.cartData
res.status(201).json({
    success:true,
    cartData
})
} catch (error) {
  console.log(error);
        res.status(400).json({
            success:false,message:'Unable to fetch the cart data'
        })  
}
}

export {addToCart,updateCart,getCart}