import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className=' my-3 flex border flex-col sm:flex-row text-xl'>

      <div className=' flex flex-col justify-center items-center sm:w-1/2 w-full'>
      <div className=' my-2 flex gap-3 items-center'>
        <p className='w-8 sm:w-11 h-[4px] bg-black'></p>
        <p>OURS COLLECTION</p>
      </div>
      <h1 className='prata-regular text-3xl'>LATTEST ARRIVALS</h1>
      <div className='flex my-2 gap-3 items-center'>
        <p>SHOP NOW</p>
        <p className='w-8 sm:w-11 h-[4px] bg-black'></p>
      </div>
        
        </div>
        <img src={assets.hero_img} className=' w-full sm:w-1/2' alt="" />  
    </div>
  )
}

export default Hero