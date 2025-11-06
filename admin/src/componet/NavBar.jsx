import React from 'react'
import {assets} from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div>
   <div className='flex border-b border-gray-300 justify-between sm:px-23 py-3 px-5 items-center'>
    <img className='w-25 sm:w-36' src={assets.logo} alt="ram" />
    <button onClick={()=>setToken('')} className='bg-gray-400 px-7 py-3 rounded-full text-black hover:bg-black transition-all duration-300 hover:text-white'>Logout</button>

    </div>        
 
    </div>
  )
}

export default NavBar