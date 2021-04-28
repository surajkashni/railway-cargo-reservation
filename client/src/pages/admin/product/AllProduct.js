import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../../../components/nav/AdminNav";
import {getProductsAdmin,removeProduct} from "../../../functions/product";
import {LoadingOutlined} from "@ant-design/icons";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import {useSelector} from "react-redux";
import  {toast} from 'react-toastify';
const AllProduct = () => {

  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  const {user}=useSelector((state)=>({...state}));

  useEffect(() => {
   loadProducts();
  },[]);
   
    
  
  const loadProducts= async()=>{
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API}/products`)
    .then(res=>{setProducts(res.data);
    setLoading(false)});
    
  }
  const handleRemove=async(slug)=>{
 let answer=window.confirm("Delete Product?");
 if(answer){
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
     authtoken: user.token,
    },
  })
   .then((res)=>{
     loadProducts();
     toast.error(`${res.data.title} is deleted`);
   })
   .catch((err)=>{
     if(err.response.status===400) toast.error(err.response.data);
     console.log(err);
   })
 }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        
        <div className="col">
          {loading?(<LoadingOutlined className="text-danger h4"/>):(<h4>All Trains</h4>)}
          <div className="row">
            {products.map((product)=>(
            <div key={product._id} className="col-md-4 pb-3">
           <AdminProductCard product={product}  handleRemove={handleRemove}/> 

                  
             </div>))}
    
          </div>
          </div>
          </div>
    </div>
  );
};

export default AllProduct;
