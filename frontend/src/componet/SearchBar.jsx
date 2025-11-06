import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search, setSearch,showSearch, setShowSearch}=useContext(ShopContext)
    const [visiable, setVisiable] = useState(false)
    const location=useLocation()
    // console.log(showSearch);
    useEffect(() => {
      if(location.pathname.includes('collection')){
        setVisiable(true)
      }
      else{
        setVisiable(false)
      }
    }, [location])
    
    
  return showSearch && visiable ? (
    <div className=' border-t border-b bg-gray-200 text-center mt-3'>
      <div className='inline-flex justify-center items-center px-4 py-2 mt-3 mb-4 border w-full sm:w-2/4 rounded-full '>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search Here..........' className='   flex-1  outline-none bg-inherit' />
        <img  src={assets.search_icon} className='w-4' alt="" />
      </div>
      <img src={assets.cross_icon} onClick={()=>setShowSearch(false)} className='inline w-4' alt="" />
      
    </div>
  ):null
}

export default SearchBar