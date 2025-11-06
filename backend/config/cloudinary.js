
import {v2 as cloudinary} from "cloudinary"

const connectCloudinary=()=>{
    cloudinary.config({
        api_key:process.env.CLOUDINARY_API_KEY,
        cloud_name:process.env.CLOUDINARY_NAME,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })
   return cloudinary;
}

export default connectCloudinary;