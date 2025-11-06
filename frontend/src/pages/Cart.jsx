import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../componet/Title'
import { assets } from '../assets/assets'
import CartCount from '../componet/CartCount'
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const navigate = useNavigate()
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  useEffect(() => {
    let tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        } catch (error) {

        }
      }
    }
    setCartData(tempData);

  }, [cartItems])

  return (
    <div className='  my-7 '>
      <div className=' text-3xl pl-5'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className=' mt-5'>
        {
          cartData.map((item, index) => {
            let productData = products.find((product) => product._id === item._id)
            if(!productData) return null;
            return (
              <div key={index} className=' p-4 px-3 items-center border-t border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_3.5fr_1.5fr] gap-10'>
                <div className='flex items-start gap-5'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div className=''>
                    <p className='text-lg '>{productData.name}</p>
                    <div className=' flex gap-4'>
                      <p className=' font-medium'>{currency}{productData.price} </p>
                      <p className=' border px-2'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" className=' mr-4  px-2 w-10 sm:w-12 border outline-none  ' value={item.quantity} min={1} name="" id="" />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='w-6 mr-3 cursor-pointer' alt="" />
              </div>
            )
          })
        }
      </div>
      <div>
        <div className=' flex items-center sm:justify-end'>
          <CartCount/>
        </div>
               <div className=' w-full text-end'>
            <button onClick={()=>navigate('/placeOrder')} className=' cursor-pointer bg-black text-white p-2 px-3 py-4 mt-2'>PROCEDS TO CHECKOUT</button>
          </div>
      </div>
    </div>
  )
}

export default Cart