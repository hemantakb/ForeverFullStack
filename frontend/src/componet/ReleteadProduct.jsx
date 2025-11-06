import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../componet/Title'
import ProductItem from '../componet/ProductItem'

const ReleteadProduct = ({category,subCategory}) => {
    const {products}=useContext(ShopContext)
    const [releteadProduct, setReleteadProduct] = useState([])
    const filterOut=async()=>{
        let productCopy=products.slice();
        if(category.length>0){
            productCopy=(productCopy.filter((item)=>(category===item.category)))
        }
        if(subCategory.length>0){
            productCopy=(productCopy.filter((item)=>(subCategory===item.subCategory)))
        }
        setReleteadProduct(productCopy.slice(0,5))
    }
    useEffect(() => {
     filterOut()
    }, [category,subCategory])
    
  return (
    <div className=' my-3'>
        <div className=' text-center text-2xl'>
          <Title text1={'RELETEAD'} text2={'PRODUCT'}/>
        </div>
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-3 gap-3'>
         {
            releteadProduct.map((item,index)=>(
                <ProductItem key={index} name={item.name} image={item.image} id={item._id} price={item.price}/>
            ))
         }
        </div>

    </div>
  )
}

export default ReleteadProduct