import React, { useContext, useEffect, useState } from 'react'
import Title from '../componet/Title'
import ProductItem from '../componet/ProductItem'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'  // adjust path if different


const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item != category))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item != subCategory))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }
  // useEffect(() => {
  //   console.log(subCategory);


  // }, [subCategory])

  const applyFilter = () => {
    let productCopy = products.slice()
    if(search && showSearch){
      productCopy=productCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
      // console.log(productCopy);

    }
    setFilterProduct(productCopy)
  }
  useEffect(() => {
    applyFilter()
  }, [category, subCategory,products,search])



  // useEffect(() => {
  //  setFilterProduct(products);

  // }, [])
  const sortData=()=>{
    let fpCopy=filterProduct.slice()
    switch(sortType){
      case'high-low':
      setFilterProduct(fpCopy.sort((a,b)=>(b.price-a.price)))
      break;
      case 'low-high':
      setFilterProduct(fpCopy.sort((a,b)=>(a.price-b.price)))
      break;
      default:
        applyFilter()
        break;
    }
  }
  useEffect(() => {
    sortData()
  }, [sortType,products])
  

  return (
    <div className='flex flex-col sm:flex-row gap-6 border-t mt-4 '>
      <div className=' min-w-60'>
        <div className=' flex flex-col gap-4'>
          <div onClick={() => setShowFilter(!showFilter)} className=' mt-4 flex gap-3'>
            <p className=' text-xl font-medium '>FILTERS</p>
            <img src={assets.dropdown_icon} className={`h-4 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
          </div>
          <div className={` px-4 py-2 flex flex-col gap-3 border pl-3  ${showFilter ? "" : 'hidden'} sm:block`}>
            <p>TYPE</p>
            <p className=' flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" className=' w-3 ' value={'Men'} />Men
            </p>
            <p className=' flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" className=' w-3 ' value={'Women'} />Women
            </p>
            <p className=' flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" className=' w-3 ' value={'Kids'} />Kids
            </p>
          </div>
          <div className={` px-4 py-2 flex flex-col gap-3 border pl-3 my-4 ${showFilter ? "" : 'hidden'} sm:block`}>
            <p>TYPE</p>
            <p className=' flex gap-2'>
              <input onChange={toggleSubCategory} type="checkbox" className=' w-3 ' value={'Topwear'} />Topwear
            </p>
            <p className=' flex gap-2'>
              <input onChange={toggleSubCategory} type="checkbox" className=' w-3 ' value={'bottomwear'} />Bottomwear
            </p>
            <p className=' flex gap-2'>
              <input onChange={toggleSubCategory} type="checkbox" className=' w-3 ' value={'winterwear'} />Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className='sm:ml-8 flex-1'>
        <div className=' flex mt-4 flex-row justify-between'>
          <div className=' text-2xl '>
            <Title text1={'ALL'} text2={'COLLECTION'} />

          </div>
          <select onChange={(e)=>setSortType(e.target.value)} className='border p-3 cursor-pointer' name="" id="">
            <option value={'relevant'}>Sort by:Relavant</option>
            <option value={'high-low'}>Sort by:High-to-Low</option>
            <option value={'low-high'}>Sort by:Low-to-High</option>
          </select>
        </div>
        <div className=' mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 my-3'>
          {
            filterProduct.map((item, index) => (
              <ProductItem key={index} name={item.name} image={item.image} id={item._id} price={item.price} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection