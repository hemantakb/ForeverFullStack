import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='my-6'>
        <div className=' flex flex-col sm:flex-row justify-around'>
         <div className='  flex flex-col items-center gap-4' >
         <img src={assets.exchange_icon} className=' w-16' alt="" />
         <b>Easy Exchange Policy</b>
         <p>We offer hassle free exchange policy</p>
         </div>
         <div className='  flex flex-col items-center gap-4' >
         <img src={assets.quality_icon} className=' w-16' alt="" />
         <b>7 Days Return Policy</b>
         <p>We provide 7 days free return policy</p>
         </div>
         <div className='  flex flex-col items-center gap-4' >
         <img src={assets.support_img} className=' w-16' alt="" />
         <b>Best customer support</b>
         <p>we provide 16/7 customer support</p>
         </div>
        </div>
    </div>
  )
}

export default OurPolicy