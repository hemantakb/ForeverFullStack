import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {products}=useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
     const bestProduct=products.filter((item)=>(item.bestSeller))
     setBestSeller(bestProduct.slice(0,6))
    }, [products])
    
  return (
    <div className=' my-5'>
       <div className=' text-center text-3xl '>
       <Title text1={'BEST'} text2={'SELLER'}/>
       <p className=' text-sm w-2/3 m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus possimus saepe assumenda praesentium facilis provident commodi cum a molestias, sapiente delectus, ex nemo at.</p>
       </div>
       <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 my-2'>
        {
            bestSeller.map((item,inex)=>{
        return (
                            <ProductItem key={inex} name={item.name} image={item.image} id={item._id} price={item.price}/>

        )
            })
        }
       </div>
    </div>
  )
}

export default BestSeller