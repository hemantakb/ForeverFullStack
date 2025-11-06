import React from "react";
import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "api/product/list");
      console.log(res);

      if (res.data.succes) {
        setList(res.data.product);
        console.log(list);
      } else {
        toast.error("Invalid data fetching");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "api/product/delete",
        { id },
        { headers: { token } }
      );
      if (res.data.succes) {
        toast.success("product remove succfully");
        await fetchList();
      } else {
        toast.error("Unable to remove the Product");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <div className="rounded-md grid grid-cols-[1fr_3fr_1fr_1fr_1fr] border bg-gray-100 border-gray-300 p-4 ">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>SubCategory</b>
        <b className="  text-center">Remove</b>
      </div>
      <div className=" flex flex-col gap-3">
        {list.map((item, index) => {
          return (
            <div
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] my-1 items-center border border-gray-300 bg-gray-100 p-3 rounded-md"
              key={index}
            >
              <img className="size-20 " src={item.image[0]} alt="Hii" />
              <p>{item.description}</p>
              <p>{item.category}</p>
              <p>{item.subCategory}</p>
              <p
                onClick={() => removeProduct(item._id)}                                                                                                                           
                className="text-center text-lg font-bold"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};                  

export default List;
 