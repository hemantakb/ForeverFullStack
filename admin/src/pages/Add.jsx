import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import { backendUrl } from "../App";
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("Men")
  const [subCategory,setSubCategory]=useState("Topwear")
  const [bestSeller,setBestSeller]=useState(false)
  const [size,setSize]=useState([])
      const handelSubmit=async(e)=>{
        try {
          e.preventDefault()
            const formData=new FormData()
            formData.append("name",name)
            formData.append("description",description)
            formData.append("category",category)
            formData.append("subCategory",subCategory)
            formData.append("bestSeller",bestSeller)
            formData.append("price",price)
            formData.append("size",JSON.stringify(size))
            
            image1 && formData.append('image1',image1)
            image2 && formData.append('image2',image2)
            image3 && formData.append('image3',image3)
            image4 && formData.append('image4',image4)

          const res=await axios.post(
            backendUrl + 'api/product/add',formData,{headers:{token}}
          )
          console.log(res);
          toast.success("Product added succefully")
          
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
      }
  return (
    <div>
      <h1 className='text-2xl font-semibold py-3'>Upload Images</h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-3' >
        
        <div className='flex  gap-2'>
          <label htmlFor="image1">
          <img src={!image1 ?assets.upload_area:URL.createObjectURL(image1)} className='size-17' alt="" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name="" className='hidden' id="image1" />
        </label>
        <label htmlFor="image2">
          <img src={!image2 ?assets.upload_area:URL.createObjectURL(image2)} className='size-17' alt="" />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" name="" className='hidden' id="image2" />
        </label>
        <label htmlFor="image3">
          <img src={!image3 ?assets.upload_area:URL.createObjectURL(image3)} className='size-17' alt="" />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file" name="" className='hidden' id="image3" />
        </label>
        <label htmlFor="image4">
          <img src={!image4 ?assets.upload_area:URL.createObjectURL(image4)} className='size-17' alt="" />
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" name="" className='hidden' id="image4" />
        </label>
        </div>
          <div className='w-[500px]'>
            <p>Product Name</p>
            <input onChange={(e)=>setName(e.target.value)} type="text" value={name} placeholder='Enter Product Name' className='w-full border px-5 py-3 rounded-md border-gray-300' name="" id="" />
          </div>
          <div className='w-[500px]'>
            <p>Product Description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  placeholder='Enter Product Name' className='w-full border px-5 py-3 rounded-md border-gray-300' name="" id="" />
          </div>
        <div className='flex gap-4'>
            <div className='w-[120px] border border-gray-300 rounded-md  px-3 py-1'>
            <select onChange={(e)=>setCategory(e.target.value)} className='px-2' name="" id="">
            <option value="Men">Mens</option>
            <option value="Women">Womens</option>
            <option value="Kids">Kids</option>
          </select>
          </div>
          <div className='w-[120px] border  border-gray-300 rounded-md   px-3 py-1'>
            <select onChange={(e)=>setSubCategory(e.target.value)}   name="" id="">
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <input onChange={(e)=>setPrice(e.target.value)} type="text" value={price} placeholder='25' className='w-[120px] border-gray-300 rounded-md  border px-3 py-1' name="" id="" />
          </div>
        </div>
        <div className='flex gap-4'>
          <div  className={`${size.includes('S')?"bg-pink-100":"bg-slate-200"}   px-3 py-2`} onClick={()=>setSize(prev=>prev.includes("S")?prev.filter((i)=>i!="S"):[...prev,"S"])} >
            <p>S</p>
          </div>
          <div className={`${size.includes('M')?"bg-pink-100":"bg-slate-200"}  px-3 py-2 `} onClick={()=>setSize(prev=>prev.includes("M")?prev.filter((i)=>i!="M"):[...prev,"M"])} >
            <p >M</p>
          </div>
          <div className={`${size.includes('L')?"bg-pink-100":"bg-slate-200"}  px-3 py-2 `} onClick={()=>setSize(prev=>prev.includes("L")?prev.filter((i)=>i!="L"):[...prev,"L"])} >
            <p >L</p>
          </div>
          <div className={`${size.includes('XL')?"bg-pink-100":"bg-slate-200"}  px-3 py-2 `} onClick={()=>setSize(prev=>prev.includes("XL")?prev.filter((i)=>i!="XL"):[...prev,"XL"])} >
            <p  >XL</p>
          </div>
        </div>
        <div>
         <label className='flex items-center gap-2' htmlFor="Check">
           <input type="checkbox"  checked={bestSeller} onChange={()=>setBestSeller(prev=>!prev)} name="" id="Check" /> 
          <p>Add to Best Seller</p>
         </label>
          
        </div>
    <button type='submit' className='w-[150px] bg-black text-white px-2 py-3 rounded-md'>Submit</button>
        </form> 
    </div>
  )
}

export default Add;