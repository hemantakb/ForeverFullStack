import React, { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import NavBar from './componet/NavBar'
import SideBar from './componet/SideBar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './componet/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency="$";

const App = () => {
  const [token,setToken]=useState(
    localStorage.getItem('token')?localStorage.getItem('token'):''
  )

  useEffect(()=>{
localStorage.setItem('token',token)
  },[token])
  return (
  <div className='bg-gray-50'>
    <ToastContainer/>
    {
      !token ?  <Login setToken={setToken} />:<>

  <NavBar setToken={setToken}/>
  <div className='sm:px-23 min-h-screen flex w-full   '>
    <SideBar/>
    <div className='w-[70%] mx-auto py-6'>
      <Routes>
        <Route path='/' element={<Add token={token}/>} />
       <Route path='/add' element={<Add token={token}/>}/>
       <Route path='/list' element={<List token={token}/>}/>
       <Route path='/order' element={<Order token={token}/> }/>
      </Routes>
    </div>

  </div>
  
  
  
  </>
    }
    
  </div>
  )
}

export default App