import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartCount = () => {
  const { products, currency, delivery_fee, cartAmout } = useContext(ShopContext)

  return (
    <div className='my-15'>
      <div className='text-2xl pl-4'>
        <Title text1={'CART'} text2={'COUNT'} />
      </div>
      <div className=' flex flex-col gap-4 sm:w-[450px]'>
        <div className=' flex border-b-gray-300 justify-between'>
          <p>Subtotal</p>
          <p>{currency}{cartAmout()}.00</p>

        </div>
        <div className=' flex border-b-gray-700 justify-between'>
          <p>DeliveryFee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className=' flex  justify-between'>
          <b>Total</b>
          <b>{currency}{cartAmout() === 0 ? '0' : cartAmout() + delivery_fee}.00</b>

        </div>
           
      </div>
    </div>
  )
}

export default CartCount