import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LattestArrivals = () => {
    const {products}=useContext(ShopContext);
    const [lattestProduct, setLattestProduct] = useState([])
    useEffect(() => {
     setLattestProduct(products.slice(0,10))
    }, [products])
    
    
  return (
    <div className='my-5'>
        <div className=' text-center text-3xl'>
           
             <Title text1={'LATTEST'} text2={'ARRIVALS'}/>
           
            <p className=' m-auto  text-sm w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, suscipit! ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nemo vero incidunt expedita itaque maxime!</p>
        </div>
        <div className='gap-2 my-3  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {
           lattestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
           ))
          }
        </div>
    </div>
  )
}

export default LattestArrivals