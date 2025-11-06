import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()
  const {token,setToken,setcartItems,backendUrl,} =useContext(ShopContext)
  const [currentState, setcurrentState] = useState('Login')
  const [formData,setFormData]=useState(
    {
      name:'',
      email:'',
      password:''
    }
  )
  const handelChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handelSubmit=async(e)=>{
   e.preventDefault()
   
   try {
    if(currentState==='SignUp'){

      const res=await axios.post(backendUrl +'api/user/register',{
        name:formData.name,
        email:formData.email,
        password:formData.password
      })
      console.log(res);
      if(res.data.success){
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
      }else{
        toast.error(res.data.message||'an error occurs')
      }
      
    
   }else{
try {
  const res=await axios.post(backendUrl +'api/user/login',{email:formData.email,password:formData.password})
console.log(res);
if(res.data.success){
  setToken(res.data.token)
  localStorage.setItem('token',res.data.token)
}else{
  toast.error('An error occur')
}

} catch (error) {
  console.log(error);
  toast.error(error.message)
  
}

   }
   } catch (error) {
     console.log(error);
  toast.error(error.message)
   }
   
  }
  useEffect(()=>{
   if(token){
    console.log(token);
    
    navigate('/')
   }
    
   
  },[token])
   
  return (
  <div className="my-4 border-t px-4">
    <div className="flex items-center justify-center min-h-[50vh] gap-3 flex-col">

      <div className="flex items-center gap-2">
        <h1 className="text-3xl">{currentState}</h1>
        <span className="w-8 h-[2.5px] bg-black"></span>
      </div>

      <form onSubmit={handelSubmit} className="w-full max-w-md">
        <div className="w-full flex items-center justify-center gap-3 flex-col">

          {currentState === "Login" ? "" : (
            <input
              onChange={handelChange}
              name="name"
              value={formData.name}
              type="text"
              placeholder="Enter your name"
              className="w-full border outline-none p-3 rounded-lg text-sm sm:text-base"
            />
          )}

          <input
            onChange={handelChange}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Enter your email"
            className="w-full border outline-none p-3 rounded-lg text-sm sm:text-base"
          />

          <input
            onChange={handelChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Enter your password"
            className="w-full border outline-none p-3 rounded-lg text-sm sm:text-base"
          />
        </div>

        <div className="flex justify-between text-sm mt-2">
          <p>Forgot Password?</p>

          {currentState === "Login" ? (
            <p
              onClick={() => setcurrentState("SignUp")}
              className="cursor-pointer text-blue-600"
            >
              Sign up here
            </p>
          ) : (
            <p
              onClick={() => setcurrentState("Login")}
              className="cursor-pointer text-blue-600"
            >
              Login here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 mt-4 rounded-lg text-sm sm:text-base"
        >
          {currentState === "Login" ? "Sign in" : "Sign up"}
        </button>
      </form>
    </div>
  </div>
);


 
}

export default Login