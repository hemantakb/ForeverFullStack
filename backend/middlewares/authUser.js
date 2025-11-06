import jwt from 'jsonwebtoken'


const authUser=async(req,res,next)=>{
    const {token}=req.headers
    try {
        if(!token) return res.status(400).json({success:false,message:'Unauthorize to do the acation'})
        const decode=jwt.verify(token,process.env.JWT_SECRET)
      req.body.userId=decode.id
      next()
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:'Bad request'})
        
    }
}

export default authUser;