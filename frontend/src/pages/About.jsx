import React from 'react'
import Title from '../componet/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../componet/NewsLetter'

const About = () => {
  return (
    <div className=' border-gray-300 border-t '>
      <div className='text-center text-3xl'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className=' flex flex-col sm:flex-row gap-10   justify-center'>
        <img src={assets.about_img} className=' w-full sm:max-w-[480px]' alt="" />
        <div className=' px-5 flex  text-gray-400 items-center justify-center flex-col gap-6'>
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.

          </p>
          <p className=' flex flex-col gap-4'>
            <b className='text-black'>Our Mission</b>
            <p>
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </p>
        </div>
      </div>
      <div className=' my-10 text-2xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className=' mt-4 flex flex-col sm:flex-row'>
        <div className='p-5   border flex justify-center flex-col gap-3 border-gray-300'>
          <b>Quality Assurance:</b>
          <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='p-5 px-3 py-3 border flex justify-center flex-col gap-3 border-gray-300'>
          <b>Convenience:
          </b>
          <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.

          </p>
        </div>
        <div className='p-5 px-3 py-3 border flex justify-center flex-col gap-3 border-gray-300'>
          <b>Exceptional Customer Service:
          </b>
          <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.

          </p>
        </div>
      </div>
      <div className='my-10'>
        <NewsLetter/>
      </div>
    </div>
  )
}

export default About