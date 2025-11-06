import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import ReleteadProduct from '../componet/ReleteadProduct'
import {toast} from "react-toastify"

const Product = () => {
  const { products, currency,addToCart } = useContext(ShopContext)
  const { productId } = useParams()
  const [releteadProduct, setReleteadProduct] = useState(false)
  const [image, setImage] = useState([])
  const [size, setsize] = useState('')
  const fetchProduct = async () => {
    let productCopy = products.slice()
    productCopy.map((item) => {
      if (item._id === productId) {
        setReleteadProduct(item)
        setImage(item.image[0])
        // console.log(item.image);
        // console.log(item.name);

        return null;
      }
    })
  }
  useEffect(() => {
    if(products.length >0){
      fetchProduct()
    }
    
  }, [productId,products])


  return releteadProduct ? (
    <div className=' border-t my-3 mb-4   '>
      <div className=' flex flex-col mt-4 sm:flex-row gap-3 '>
        <div className='flex-1  items-center justify-center  flex  flex-col-reverse  sm:flex-row gap-3'>
          <div className=' flex flex-row   sm:flex-col  gap-3 sm:w-24 overflow-x-auto sm:overflow-y'>
            {
              releteadProduct.image.map((item) => (
                <img onClick={() => setImage(item)} src={item} className='w-24 ' alt="" />
              ))
            }
          </div>
          <div className='flex '>
            <img className=' w-[] ' src={image} alt="" />

          </div>
        </div>
        <div className=' pl-3 flex-1  flex flex-col '>
          <div className=''>
            <p className='text-2xl font-medium'>{releteadProduct.name}</p>
            <div className=' flex items-center flex-row gap-2'>
              <img src={assets.star_icon} className='w-4' alt="" />
              <img src={assets.star_icon} className='w-4' alt="" />
              <img src={assets.star_icon} className='w-4' alt="" />
              <img src={assets.star_icon} className='w-4' alt="" />
              <img src={assets.star_dull_icon} className='w-4' alt="" />
              <p className=' pl-3'>(122)</p>
            </div>
            <p className=' m-2 text-3xl font-medium'>{currency}{releteadProduct.price}</p>
            <p className=' m-2 text-gray-500'>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
            <div className=' my-6 flex flex-col gap-3'>
              <p className='  text-xm'>Select Size</p>
              <div className=' flex gap-3'>
                {
                  releteadProduct.size.map((item,i) => (
                    <button key={i} onClick={()=>setsize(item)} className={`cursor-pointer border px-4 py-2 gap-3 bg-gray-100 ${item === size?'border-orange-500':''} ` }>{item}</button>
                  ))
                }
              </div>
            </div>
            {/* <button onClick={()=>addToCart(releteadProduct._id,size)} className=' cursor-pointer bg-black text-white px-6 py-3 active:bg-gray-400'>ADD TO CART</button> */}
            <button
  onClick={() => {
    if (!size) return toast.error('Please select a size before adding to cart');
    addToCart(releteadProduct._id, size);
  }}
  className="cursor-pointer bg-black text-white px-6 py-3 active:bg-gray-400"
>
  ADD TO CART
</button>
            <hr className=' border-gray-500 my-4' />
            <div className=' flex flex-col gap-3'>
              <p className='text-gray-500 text-sm'>100% Original product.

              </p>
              <p className='text-gray-500 text-sm'>Cash on delivery is available on this product.

              </p>
              <p className='text-gray-500 text-sm'>Easy return and exchange policy within 7 days.

              </p>
            </div>
          </div>
        </div>
      </div>

<ReleteadProduct category={releteadProduct.category} subCategory={releteadProduct.subCategory}/>

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product