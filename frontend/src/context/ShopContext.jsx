import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import {toast} from "react-toastify"




export const ShopContext=createContext();



const ShopContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    
   
    const currency='$';
const delivery_fee=10;
const [products,setProducts]=useState([])
const [search, setSearch] = useState('')
 const [showSearch, setShowSearch] = useState(false)
 const [cartItems, setcartItems] = useState({})
 const [token,setToken]=useState('')
 
 

 const getProduct=async()=>{
    try {
      const res=await axios.get(backendUrl + 'api/product/list')  
      console.log(res);
      if(res.data.succes){
        setProducts(res.data.product)
        console.log(products)
      }else{
        toast.error('unable to add the product')
      }
      
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
 }

 useEffect(()=>{
getProduct()


 },[])
 

 const addToCart=async(itemId,size)=>{
    console.log(itemId,size);
    if(!size){
      return  toast.error('Unable to add the product in cart')
    }
    
    
    let cartData=structuredClone(cartItems)
    if(cartItems[itemId]){
        if(cartItems[itemId][size]){
            cartData[itemId][size]+=1
        }
        else{
            cartData[itemId][size]=1
        }
    }
    else{
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    setcartItems(cartData);
    if(token){
       
        try {
            await axios.post(backendUrl + 'api/cart/add',{itemId,size},{headers:{token}})
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    
 }
  
 const getCartCount=()=>{
    let totalCount=0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try{
             if(cartItems[items][item]>0){
                totalCount+=cartItems[items][item]
             } 
            }
            catch(error){

            }
        }
    }
    return totalCount;
 }
    
 const cartAmout=()=>{
    let cartCount=0;
    for(const items in cartItems){
        let info=products.find((product)=>product._id===items)
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item]){
                    cartCount+= info.price * cartItems[items][item]
                }
            } catch (error) {
                
            }
        }
 
    }
 return cartCount; 
}

 
 const updateQuantity=async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems)
    cartData[itemId][size]=quantity
    setcartItems(cartData)
    if(token){
        try {
          await  axios.post(backendUrl + 'api/cart/update',{itemId,size,quantity},{headers:{token}})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
 }

 
 const getUserCart=async(token)=>{
     try {
         const res=await axios.post(backendUrl + 'api/cart/get',{},{headers:{token}})
         if(res.data.success) {
             setcartItems(res.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    
    useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        const savedToken=localStorage.getItem('token')

        setToken(savedToken)
     getUserCart(savedToken)
    }
     },[])
const value={
     
     search, setSearch,showSearch, 
     addToCart,getCartCount,updateQuantity,
     cartAmout,token,setToken,setcartItems,backendUrl,cartItems,products,currency,delivery_fee,setShowSearch,

}
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
 export default ShopContextProvider