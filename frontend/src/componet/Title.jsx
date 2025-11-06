import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className=' my-3'>
        <div className='  text-xl inline-flex items-center gap-3'>
          <p className=' font-semibold text-gray-400'>{text1} <span className='  text-gray-700'>{text2}</span></p>
         <p className=' w-8 sm:w-11 h-[3px] bg-black '></p>
        </div>
    </div>
  )
}

export default Title