import React from 'react'
import Hero from '../componet/Hero'
import LattestArrivals from '../componet/LattestArrivals'
import BestSeller from '../componet/BestSeller'
import OurPolicy from '../componet/OurPolicy'
import NewsLetter from '../componet/NewsLetter'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LattestArrivals/>
        <BestSeller/>
        <OurPolicy/>
        <NewsLetter/>
    </div>
  )
}

export default Home