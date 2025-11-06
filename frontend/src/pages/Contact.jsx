import React from 'react'
import Title from '../componet/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../componet/NewsLetter'

const Contact = () => {
  return (
    <div className='my-4 border-t border-gray-300'>
      <div className=' mt-4 text-center text-3xl'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className=' flex flex-col sm:flex-row gap-10 items-center justify-center'>
        <img src={assets.contact_img} className='w-full sm:w-[480px]' alt="" />
        <div className=' flex flex-col gap-4 '>
          <b>Our Vision</b>
          <div className=' text-gray-400 text-sm flex flex-col gap-2 '>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div className=' text-gray-400 text-sm flex flex-col gap-2 '>
            <p>Tel: (415) 555-0132 </p>
            <p>Email: admin@forever.com </p>
          </div>
          <b>Carrers At Forever</b>

          <p>Learn more about our teams and job openings.</p>
          <button className=' mt-5  cursor-pointer border p-4 py-3 hover:bg-black hover:text-white transition-all duration-500'>EXPLORE JOBS</button>
        </div>
      </div>
      <div>
        <NewsLetter/>
      </div>
    </div>
  )
}

export default Contact