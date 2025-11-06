import React from 'react'
import { assets } from '../assets/assets'

const Fotter = () => {
    return (
        <div className='my-36'>
            <div className=' flex flex-col  gap-4 sm:grid sm:grid-cols-[4fr_2fr_2fr]'>
                <div className=' flex flex-col justify-center gap-4'>
                    <img src={assets.logo} className=' w-34' alt="" />
                    <p className=' w-full sm:w-3/4 text-gray-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure non reiciendis accusamus ducimus minima harum odio iusto, perferendis numquam quod laboriosam aliquid, quaerat qui inventore suscipit rerum doloremque sit ex saepe earum.</p>
                </div>
                <div className=' flex flex-col sm:items-center   gap-4'>
                    <h1 className='text-2xl font-medium'>COMAPANY</h1>
                    <ul className=' text-sm flex flex-col gap-2 '>
                        <li>HOME</li>
                        <li>ABOUT US</li>
                        <li>DELIVERY</li>
                        <li>PRIVICY POLICY</li>
                    </ul>
                </div>
                <div className='  flex flex-col sm:items-center gap-4'>
                  <h1 className=' text-2xl font-medium'>GET IN TOUCH</h1>
                  <div className=' text-sm flex flex-col gap-2'>
                    <p>+(74)-564783-7893</p>
                    <p>Demo@gmail.com</p>
                  </div>
                </div>
                

            </div>
            <hr className=' my-5 border border-gray-200' />
            <p className=' text-center text-sm text-gray-400 '>Copyright 2025@Hemanta.dev - All Right Reserved.</p>
        </div>
    )
}

export default Fotter