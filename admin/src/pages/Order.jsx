import React from 'react'
import {backendUrl,currency} from '../App'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import { assets } from '../assets/assets'


const Order = ({token}) => {
  const[orders,setOrders]=useState([])

  const fetchAllOrders=async()=>{
    if(!token) return null;
    try {
      const res=await axios.post(backendUrl+"api/order/list",{},{headers:{token}})
      console.log(res);
      
      if(res.data.success){
        setOrders(res.data.orders)
      }else{
        toast.error('Unable to procceds')
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

      
    }

  }
useEffect(()=>{
  fetchAllOrders()
},[token])
useEffect(()=>{
  if(orders.length>0){
    console.log(orders);
    
  }
})
const updateStatus=async(orderId,e)=>{
  try {
    const res=await axios.post(backendUrl + 'api/order/update',{orderId,status:e.target.value},{headers:{token}})
    console.log(res);
    if(res.data.success){
      await fetchAllOrders()
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
}
  return (
    <div>
      <h1>Order Page</h1>

      <div >
        <div >
          {
            orders.map((order,index)=>(
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_0.8fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] border-2 p-6 my-4 items-start text-lg ' key={index}>
                <img src={assets.parcel_icon} alt="" />
               <div>
                 {
                  order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>
                    }else{
 return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span> , </p>

                    }
                  })
                }
                <div>
            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.street}</p>
            <p>{order.address.city+','+order.address.state+','+order.address.country+''}</p>
          <p>{order.address.phone}</p>
          </div>
               </div>
               
<p>{currency}{order.amount}</p>
          
 <div>
  <p>Item:{order.items.length}</p>
  <p>Method:{order.paymentMethod}</p>
  <p>Payment:{order.payment?'Done':'pending'}</p>
  <p>Date:{new Date(order.date).toDateString()}</p>
 </div>

 <select onChange={(e)=>updateStatus(order._id,e)} className='border p-2' value={order.status} name="" id="">
  <option value="Order Placed">Order Placed</option>
  <option value="Packing">Packing</option>
  <option value="Shipped">Shipped</option>
  <option value="Out for delivery">Out for delivery</option>
  <option value="Delivered">Delivered</option>
 </select>


              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Order