import React from 'react'

const NewsLetter = () => {
  return (
    <div className='my-18'>
        <div className=' flex flex-col justify-center text-center  gap-4'>
   <h1 className=' text-gray-700 text-3xl font-bold'>Subscribe Now and Get 20% off</h1>
   <p className=' text-gray-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsum dolor sit amet.</p>
   <div className='inline-flex text-center  sm:items-center  w-full sm:w-1/2  m-auto  gap-2 flex-row'>
  <input type="text" className=' pl-3 outline-none py-3 w-1/2 sm:w-full  border border-gray-300  ' placeholder='Enter your email address' />
  <button className=' p-4 py-3 bg-black text-white '>Subscribe </button>
   </div>
        </div>
    </div>
  )
}

export default NewsLetter