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

      const res=await axios.post(backendUrl +'api/user/register',formData)
      console.log(res);
      if(res.data.success){
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
      }else{
        toast.error('An error Occur')
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
    <div className=' my-4 border-t'>
      <div className='flex items-center justify-center min-h-[50vh] gap-3 flex-col'>
        <div className=' flex items-center gap-2'>
                      <h1 className=' text-3xl'>{currentState} </h1>
                      <span className='w-8 h-[2.5px] bg-black'></span>

        </div>
           <form onSubmit={handelSubmit} >
             <div className=' w-[450px] flex items-center justify-center gap-3 flex-col'>
          {currentState==='Login'?"":  <input onChange={handelChange} name='name' value={formData.name} className=' border w-full outline-none p-2' type="text" placeholder=' Enter ur name' />}
            <input onChange={handelChange} name='email' value={formData.email} className=' border w-full outline-none p-2' type="text" placeholder=' Enter ur mail' />
                        <input onChange={handelChange} name='password' value={formData.password} className=' border w-full outline-none p-2' type="password" placeholder=' Enter ur Password' />

            </div>
           <div className=' flex justify-between'>
            <p>Forgot Password?</p>
             {
              currentState==='Login'?
              <p onClick={()=>setcurrentState('Sign up')} className='cursor-pointer'>SignUp here</p>: <p onClick={()=>setcurrentState('Login')} className='cursor-pointer'>Login here</p>
            }
           </div>

             <button type='submit' className='bg-black cursor-pointer text-white p-5 px-2 py-3 mt-4'>{currentState==='Login'?'sign in':'sign up' }</button>            
           </form>
      </div>

    </div>
  )
}

export default Login