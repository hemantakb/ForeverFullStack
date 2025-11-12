import React, { useContext, useEffect, useState } from 'react'
import Title from '../componet/Title'
import CartCount from '../componet/CartCount'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {cartAmout,token,setToken,setcartItems,backendUrl,cartItems,getCartCount,products,currency,delivery_fee,
} =useContext(ShopContext)
  const [method, setMethod] = useState('cod')

  const [message,setMessage]=useState(false)
  
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
   state:'',
    zipcode:'',
    country:'',
    phone:''

  })
  const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      console.log(response);
      
      try {
        const {data}=await axios.post(backendUrl+'api/order/verifyrozar',response,{headers:{token}})
      if(data.success){
        navigate('/order')
        setcartItems({})
      }else{
        navigate('/cart')
      }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
      
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
  const handelChange=(e)=>{
   setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handelSubmit=async(e)=>{
    e.preventDefault()
    console.log(formData);
    
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)

            }
          }
        }
      }
      console.log(orderItems); 

      let orderData={
       address:formData,
        items:orderItems,
        amount:cartAmout()+delivery_fee
      }
     
      
      switch(method){
        case 'cod':
          console.log(orderData);
          
     const res=await axios.post(backendUrl + 'api/order/place',orderData,{headers:{token}})
     console.log(res);
     
     if(res.data.success){
     setcartItems({})
     navigate('/order')
     }else{
      toast.error(res.data.message)
     }
        break;
        case 'stripe':
          const  resStripe=await axios.post(backendUrl + 'api/order/stripe',orderData,{headers:{token}})

          if(resStripe.data.success){
            const {session_url}=resStripe.data
            window.location.replace(session_url)
          }else{
            toast.error('An error occurs')
          }
          


        break;

        case 'rozar':

const resRazorpay=await axios.post(backendUrl+'api/order/rozorpay',orderData,{headers:{token}})
if(resRazorpay.data.success){
  initPay(resRazorpay.data.order);
  
}

        break;
        

default:

      }
      
    } catch (error) {
      
    }
  }

  // const altert=()=>{
  //   if(message){
  //    return toast.error('choose another payment method')
  //   }
  //   return null;
  // }
useEffect(() => {
  if (message) {
    toast.error('Unbale to use the Rozarpay Choose another payment method');
  }
}, [message]);
useEffect(()=>{
if(!token){
  navigate('/cart')
  toast.error('Please login or SignUp to perform actions')
}else if(getCartCount()===0){
navigate('/cart')
toast.error("Please add item's to cart")
}
},[token])

  const navigate=useNavigate()
  return (
    <form  onSubmit={handelSubmit} className='mt-4 border-t'>
      <div className='text-2xl  text-center'>
        <Title text1={'YOUR'} text2={'INFORMATION'} />
      </div>
      <div className='flex flex-col sm:flex-row gap-6 items-center'>
        <div className=' w-full sm:w-[450px] flex flex-col gap-3 '>
          <div className=' flex gap-3'>
            <input onChange={handelChange} type="text"  name='firstName' value={formData.firstName} placeholder='FastName' className='sm:w-full w-1/2 px-2 p-2 border outline-none' />
            <input onChange={handelChange} type="text"  name='lastName' value={formData.lastName} placeholder='LastName' className='sm:w-full w-1/2 px-2 p-2 border outline-none' />
          </div>
          <input onChange={handelChange} type="email" name='email' value={formData.email}  placeholder='Enter ur mail' className='sm:w-full  px-2 p-2 border outline-none' />
          <input onChange={handelChange} type="text"  name='street' value={formData.street} placeholder='Street' className='sm:w-full  px-2 p-2 border outline-none' />
          <div className=' flex gap-3'>
            <input onChange={handelChange} type="text"  name='city' value={formData.city} placeholder='City' className='sm:w-full w-1/2  px-2 p-2 border outline-none' />
            <input onChange={handelChange} type="text"  name='state' value={formData.state} placeholder='State' className='sm:w-full w-1/2  px-2 p-2 border outline-none' />
          </div>
          <div className=' flex gap-3'>
            <input onChange={handelChange} type="number" name='zipcode' value={formData.zipcode}  placeholder='Zipcode' className='sm:w-full w-1/2 px-2 p-2 border outline-none' />
            <input onChange={handelChange} type="text"  name='country' value={formData.country} placeholder='Country' className='sm:w-full w-1/2 px-2 p-2 border outline-none' />
          </div>
          <input onChange={handelChange} type="number"  name='phone' value={formData.phone} placeholder='Phone' className='sm:w-full  px-2 p-2 border outline-none' />
 <button></button>
        </div>
        <div className=' pl-9 flex-1'>
         <div className=' '>
 <CartCount/>
         </div>
         <div className=' text-2xl '>
<Title text1={'PAYMENT'} text2={'OPTION'}/>
         </div>
        <div>
           <div   className='flex items-center  flex-col gap-6 sm:flex-row '>
            <div onClick={(e)=>{e.stopPropagation(),setMethod('stripe')}} className=' p-3 px-2 py-3 text-center border bg-gray-300 flex items-center gap-3'>
              <p className={`w-4 h-4 border rounded-full ${method==='stripe'?' bg-green-400':""}`}></p>
              <img className='w-12' src={assets.stripe_logo} alt="" />
            </div>
         
              <div onClick={(e)=>{e.stopPropagation(),setMethod('rozar'),setMessage(true)}} className=' p-3 px-2 py-3 text-center border bg-gray-200 flex items-center gap-3' >
                <p className={`w-4 h-4 border rounded-full ${method==='rozar'?' bg-red-600':""}`}></p>
              <img className='w-19 ' src={assets.razorpay_logo} alt="" />
              
              </div>
             
           
            <div onClick={()=>{setMethod('cod'),setMessage(false)}} className=' p-3 px-2 py-3 text-center border bg-gray-300 flex items-center gap-3'>
              <p className={`w-4 h-4 border rounded-full ${method==='cod'?' bg-green-400':""}`}></p>
              {/* <img className='w-6 h-2' src={assets.stripe_logo} alt="" /> */}
              <p className='text-sm '>Cash On Delivery</p> 
            </div>
            
         </div>
          {
               message && <p className='text-red-600 text-md  capitalize py-4 '>Currently unable to use Rozarpay</p> 
              }
        </div>
         <div className=' w-full sm:text-end mt-4'>
          <button type='submit'  className=' cursor-pointer bg-black text-white p-4 px-3 py-3'>Place Order</button>
         </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder