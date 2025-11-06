import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Login from './pages/Login'
import Product from './pages/Product'
import Contact from './pages/Contact'
import NavBar from './componet/NavBar'
import About from './pages/About'
import Fotter from './componet/Fotter'
import SearchBar from './componet/SearchBar'
import Verify from './pages/Verify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <NavBar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/placeOrder' element={<PlaceOrder/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Fotter/>
    </div>
  )
}

export default App