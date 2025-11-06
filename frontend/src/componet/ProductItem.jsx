import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,name,image,price}) => {
    const {currency}=useContext(ShopContext)
  return (
    <div className=' my-4'>
        <Link to={`/product/${id}`}>
        <div className=' flex flex-col gap-3'>
            <div className=' overflow-hidden'>
                <img src={image[0]} className=' hover:scale-110 transition-all ' alt="" />
            </div>
          <div className=' flex flex-col gap-2 justify-center'>
            <p className='text-sm w-2/3'>{name}</p>
            <p>{currency}{price}</p>
            
          </div>
        </div>
        
        </Link>
    </div>
  )
}

export default ProductItem