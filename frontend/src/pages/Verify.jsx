import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { useNavigate,  useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Verify = () => {
    const {setcartItems,backendUrl,token}=useContext(ShopContext)
    const navigete=useNavigate()
    const [searchParams,setSearchParams]=useSearchParams()
    const orderId=searchParams.get('orderId')
    const success=searchParams.get('success')
    const verifyPayment=async()=>{
     try {
        if(!token) return null;
       const res=await axios.post(backendUrl+'api/order/verify',{orderId,success},{headers:{token}})
       if(res.data.success){
        setcartItems({})
        navigete('/order')

       }else{
        navigete('/cart')
       }
    
     } catch (error) {
        console.log(error);
        toast.error(error.message)
     }
   
   
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>Verify</div>
  )
}

export default Verify