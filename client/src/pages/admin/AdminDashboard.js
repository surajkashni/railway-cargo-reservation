import React, { useState, useEffect } from "react";
import axios from 'axios';
import AdminNav from "../../components/nav/AdminNav";

import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Order from '../../components/order/Order';

const AdminDashboard = () => {

  const [orders,setOrders]=useState([]);
  const {user} = useSelector((state)=>({...state}));

  useEffect(()=>{
    loadOrders();
  },[]);

  const handleStatusChange=async(orderId,orderStatus)=>{
    await axios.put(`${process.env.REACT_APP_API}/admin/order-status`,{orderId,orderStatus},{
      headers:{
          authtoken:user.token,
      }
  }).then((res)=>{
      toast.success("Status Updated");
      loadOrders();
    });
  }

  const loadOrders= async()=>{
    await axios.get(`${process.env.REACT_APP_API}/admin/orders`,{
      headers:{
          authtoken:user.token,
      }
  }).then((res)=>{
      console.log(res.data);
      setOrders(res.data);
    })
  }
 
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
          <AdminNav />
        </div>
        
        <div className="col bg-white">
          <h4 className="text-center"><button className="m-2 btn-lg btn-primary">AdminDashboard</button></h4>
         <Order order={orders} handleStatusChange={handleStatusChange}/>
          
         
          </div>
          </div>
    </div>
  );
};

export default AdminDashboard;