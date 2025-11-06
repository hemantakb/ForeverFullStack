import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const hadelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hadelSubmit = async (e) => {
    try {

      console.log(backendUrl);
      
      e.preventDefault();
      const res = await axios.post(
        backendUrl + "api/user/adminLogin",
        formData
      );
      console.log(res);
      
     if(res.data.success){
      toast.success("Welcome Back admin")
      setToken(res.data.token)
     }
     else{
      toast.error('Unable to procceds further as u are not an admin')
     }
    } catch (error) {
      // console.log(error);
      // toast.error(error.message)
      const message =
      error.response?.data?.message ||
      error.response?.data?.msg ||
      "Login failed. Please check your credentials.";
      
    toast.error(message);
    }
  };

  return (
    <div className="flex  flex-col min-h-screen items-center justify-center ">
      <h1 className="text-2xl px-2 font-bold py-8">
        Hey Admin Please Login To get all of your Sakti's
      </h1>
      <div className=" min-w-[50%] bg-gray-50 rounded-md  shadow px-4 sm:px-12 sm:py-8 py-3    ">
        <h1 className="text-2xl font-bold">Admin Pannel</h1>
        <form onSubmit={hadelSubmit} className="min-w-84 space-y-3">
          <div className="space-y-2 ">
            <p className="font-semibold text-sm">Enter your email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="mail@gmail.com"
              onChange={hadelChange}
              id=""
            />
          </div>
          <div>
            <p className="font-semibold text-sm">Enter your password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="123456"
              onChange={hadelChange}
              id=""
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md  hover:bg-black transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
