import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../componet/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {
  const {backendUrl,token,currency}=useContext(ShopContext)
  const [order,setOrder]=useState([])

   const loadOrder=async()=>{
    try {
      if(!token) return
      const res=await axios.post(backendUrl+'api/order/user',{},{headers:{token}})
      console.log(res);
      if(res.data.success){
 let allOrder=[]
  res.data.order.map((ord)=>{
    ord.items.map((item)=>{
      item['status']=ord.status,
      item['payment']=ord.payment,
      item['paymentMethod']=ord.paymentMethod,
      item['Date']=ord.Date
      allOrder.push(item)
    })
  })
  setOrder(allOrder.reverse());
  
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
   }

   useEffect(()=>{
    loadOrder()
   },[token])

  
  return (
    <div className=' mt-2 border-t'>
      <div className=' mb-3 text-2xl'>
        <Title text1={'YOUR'} text2={'ORDER'}/>
      </div>
      <div className=' '>
        {
          order.map((item,index)=>(
            <div key={item._id} className=' grid grid-rows-1 grid-cols-2 items-center  border-b'>
                <div className=' flex p-4 gap-4 items-start '>
                    <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                   <div>
                     <p>{item.name}</p>
                     <div className='flex items-center gap-3'>
                      <p>{currency}{item.price}</p>
                      <p className=' p-4 px-3 py-3 border bg-gray-200'>{item.size}</p>
                     </div>
                     <p className='text-sm text-gray-700'>Date:<span className='text-sm text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                     <p className='text-sm text-gray-700'>Mode:<span className='text-sm text-gray-400'>{item.paymentMethod}</span></p>
                   </div>

                </div>
                <div className='  flex justify-between'>
                  <div className=' flex items-center gap-2'>
                     <p className='w-4 h-4 bg-green-400 border rounded-full'></p>
                     <p>{item.status}</p>
                  </div>
                  <p onClick={loadOrder} className=' px-4 py-2 bg-gray-300 border'>Track ur Order</p>
                </div>
            </div>

          ))
        }

      </div>
    </div>
  )
}

export default Order