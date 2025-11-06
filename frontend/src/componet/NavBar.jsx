import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'


const NavBar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const [visiable, setVisiable] = useState(false)
    const {setShowSearch}=useContext(ShopContext)
    const {getCartCount,token,setToken,setcartItems}=useContext(ShopContext)
    const navigate=useNavigate()

     const handelLogout=()=>{
navigate('/login')
localStorage.removeItem('token')
setToken('')
setcartItems({})
     }

    return (
        <div className=' flex items-center my-9 justify-between'>
           <Link to={'/'}><img src={assets.logo} className='w-36' alt="" /></Link> 
            <ul className='hidden sm:flex   gap-3  justify-center'>
                <NavLink to={'/'} className='flex items-center flex-col gap-2 text-black-700'>
                    <p>HOME</p>
                    <hr className='hidden h-[2px] w-2/4 bg-black' />
                </NavLink>
                <NavLink to={'/collection'} className='flex items-center   flex-col gap-2 text-black-700'>
                    <p>COLLECTION</p>
                    <hr className='hidden h-[2px] w-2/4 bg-black' />
                </NavLink>
                <NavLink to={'/about'} className='flex items-center   flex-col gap-2 text-black-700'>
                    <p>ABOUT</p>
                    <hr className=' hidden h-[2px] w-2/4 bg-black' />
                </NavLink>
                <NavLink to={'/contact'} className='flex items-center   flex-col gap-2 text-black-700'>
                    <p>CONTACT</p>
                    <hr className='hidden h-[2px] w-2/4 bg-black' />
                </NavLink>
            </ul>
            <div className=' flex items-center gap-3 sm:gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5' alt="" />
                <div className="relative group">


<div className='flex gap-4'>
    <div className="relative group">

  {/* Profile Icon */}
  <img
    src={assets.profile_icon}
    className="w-5 cursor-pointer"
    onClick={() => {
      if (!token) return navigate("/login");
      setShowProfileMenu(!showProfileMenu); // toggle mobile
    }}
    alt=""
  />

  {/* Dropdown Menu */}
  {token && (
    <div
      className={
        `absolute right-[-5px] p-3 w-36 cursor-pointer text-gray-600 bg-slate-300 rounded
         hidden sm:group-hover:block sm:opacity-100 sm:transition-all sm:duration-200 sm:mt-2 sm:text-sm 
         sm:block ` +
        (showProfileMenu ? "block" : "hidden")
      }
    >
      <p
        onClick={() => {
          navigate("/order");
          setShowProfileMenu(false);
        }}
        className="hover:text-black"
      >
        MyOrder
      </p>

      <p
        onClick={() => {
          handelLogout();
          setShowProfileMenu(false);
        }}
        className="hover:text-black"
      >
        LogOut
      </p>

      <p className="hover:text-black">Profile</p>
    </div>
  )}
</div>

               <div>
                 <Link to={'/cart'} className='relative'>
                    <img src={assets.cart_icon} className=' w-5' alt="" />
                    <p className=' absolute   aspect-square leading-4 right-[-5px] bottom-[-5px] left-[8px] text-center rounded-full bg-black px-[5px] py-[6] text-slate-300 text-[10px]'>{getCartCount()}</p>
                </Link>
               </div>
               <img onClick={() => setVisiable(true)} src={assets.menu_icon} className='w-5 sm:hidden ' alt="" />
</div>
                
            </div>
            <div className={`absolute right-0 bottom-0 top-0 bg-white ${visiable ? 'w-full' : 'w-0'}`}>
                <div className='overflow-hidden my-3 flex flex-col gap-3 text-gray-400'>
                    <div onClick={()=>setVisiable(false)} className=' flex gap-3 cursor-pointer'> 
            <img src={assets.dropdown_icon} className='rotate-180 w-5 ' alt="" />
            <p>BACK</p>
                   </div>
                  <div className=' flex flex-col '>
                     <NavLink to={'/'}>
                    <p onClick={()=>setVisiable(false)} className=' px-2  text-xl border'>HOME</p>
                   </NavLink>
                   <NavLink to={'/collection'}>
                    <p onClick={()=>setVisiable(false)} className=' px-2  text-xl border'>COLLECTION</p>
                   </NavLink>
                   <NavLink to={'/about'}>
                    <p onClick={()=>setVisiable(false)} className=' px-2  text-xl border'>ABOUT</p>
                   </NavLink>
                   <NavLink to={'/contact'}>
                    <p onClick={()=>setVisiable(false)} className=' px-2  text-xl border'>CONTACT</p>
                   </NavLink>
                  </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default NavBar