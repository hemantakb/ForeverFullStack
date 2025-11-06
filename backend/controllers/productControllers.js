// addProduct
// import connectCloudinary from "../config/cloudinary.js";
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../model/productModel.js';

const addProduct = async (req, res, next) => {
  try {
    // const cloudinary=connectCloudinary()
    const {
      name,
      price,
      description,
      size,
      bestSeller,
      category,
      subCategory,
    } = req.body;
    const image1 =req.files.image1 && req.files.image1[0];
    const image2 =req.files.image2 &&req.files.image2[0];
    const image3 =req.files.image3 && req.files.image3[0];
    const image4 =req.files.image4 && req.files.image4[0];

    const images=[image1,image2,image3,image4].filter((item)=>item!=undefined);
    const imagesUrl=await Promise.all(
        images.map(async(item)=>{
            let result= await cloudinary.uploader.upload(item.path,{resource_type:"image"})
            return result.secure_url
        })
    )
    console.log(name,price,description,size,bestSeller,category,subCategory,);
    console.log(imagesUrl);
    const productData={
        name,
        price:+(price),
        date:Date.now(),
        description,
        size:JSON.parse(size),
        bestSeller:bestSeller==="true"?true:false,
       image:imagesUrl,
       category,
       subCategory
    }
    const product= new productModel(productData)
    await product.save()
    
      res.json({succes:true,msg:"Product added succesfully",product})
    
  } catch (error) {
console.error('Error in addProduct:', error);
  res.status(500).json({ message: 'Server Error', error: error.message })
  }
};

//list PRoduct
const listProduct = async (req, res, next) => {
  
    try {
        const product =await productModel.find({})
        res.json({
            succes:true,
            product
        })
    } catch (error) {
        console.log(error);
        res.json({succes:false,msg:error.message})
        
    }

    

};

// remove Product
const removeProduct = async (req, res, next) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({succes:true,msg:"product remove succesfully"})
    } catch (error) {
         console.log(error);
        res.json({succes:false,msg:error.message})
        
    }
};

const singleProduct=async(req,res,next)=>{

    
    try {
        const {productId}=req.body
        const product=await productModel.findById(productId)
        res.json({succes:true,product})
    } catch (error) {
         console.log(error);
        res.json({succes:false,msg:error.message})
    }
}
export { addProduct, removeProduct, listProduct ,singleProduct};
