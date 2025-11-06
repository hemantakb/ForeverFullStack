import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    
       
         <div className='w-[24%] sm:w-[18%] py-7 m-0 flex flex-col gap-4 border-r min-h-screen border-gray-400'>
           <NavLink to={'/add'}  >
           <div className='w-full border  border-gray-400  justify-between border-r-0 flex gap-3 px-8 py-3'>
            <img className=' hidden sm:block' src={assets.add_icon} alt="" />
           <p className='font-semibold '>Add</p>
           </div>
           </NavLink>
           <NavLink to={'/list'}  >
           <div className='w-full border border-gray-400 justify-between  border-r-0 flex gap-3 px-8 py-3'>
            <img className=' hidden sm:block' src={assets.order_icon} alt="" />
           <p className='font-semibold '>List</p>
           </div>
           </NavLink>
           <NavLink to={'/order'}  >
           <div className='w-full border border-gray-400 justify-between  border-r-0 flex gap-3 px-8 py-3'>
            <img className=' hidden sm:block' src={assets.order_icon} alt="" />
           <p className='font-semibold '>Order</p>
           </div>
           </NavLink>
        </div>
       
  )
}

export default SideBar