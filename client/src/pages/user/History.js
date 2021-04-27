import React,{useEffect,useState,useHistory} from "react";
import axios from 'axios';
import UserNav from "../../components/nav/UserNav";
import {useSelector,useDispatch,} from 'react-redux';
import {getOrder} from '../../functions/user';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'



const History = () => {
const [orders,setOrders]=useState([]);
const {user} =useSelector((state)=>({...state}));
var d1=new Date();

var d2;
useEffect(()=>{
  loadUserOrders();
},[]);
const handleCancel=async(id,oid)=>{
  await axios.post(`${process.env.REACT_APP_API}/refund`,{id,oid},{
    headers:{
      authtoken:user.token,
    }
  }).then((res)=>{
    if(res.data.ok){
      //  his.push('/user/history');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
     
    }
  });
}

const loadUserOrders=async()=>{

  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken:user.token,
    },
  }).then((res)=>{
    // console.log(JSON.stringify(res.data,null,4));
    setOrders(res.data);
  })
}

const showOrderTable=(order)=>{
  // d2=order.products[0].dateofjourney;
  console.log("d2",d2)
  return(
    <table className="table table-bordered bg-white">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Count</th>
          <th scope="col">Source</th>
          <th scope="col">Destination</th>
          <th scope="col">Date </th>
         

         
          

        </tr>

      </thead>
      <tbody>
        {order.products.map((p,i)=>(
          <tr ket={i}>
            <td><b>{p.product.title}</b></td>
            <td>Rs.{p.price}</td>
            <td>{p.count}</td>
            <td>{p.product.source}</td>
            <td>{p.product.destination}</td>
            <td>{p.dateofjourney}</td>
           
          </tr>
        ))}
      </tbody>

    </table>
  );

  
  
}

const showEachOrder=()=>{
  return(
    orders.reverse().map((o,i)=>(
      <div key={i} className="m-5 p-3 card bg-light">
        <div className="row m-1" style={{justifyContent:"space-between"}}>
      <button className="btn col-md-4   btn-raised mb-2 bg-white">Amount Rs.{o.paymentIntent?o.paymentIntent.amount:" "} </button> 
      <button className="btn col-md-4   btn-raised mb-2 bg-white"> Status:{o.paymentIntent?o.paymentIntent.status:" "} </button> 
      <button className="btn col-md-4   btn-raised mb-2 bg-white">Payment Method:{o.paymentIntent?o.paymentIntent.payment_method_types:" "}</button> 
      <button className="btn col-md-4   btn-raised mb-2 bg-white"> Date:  {o.createdAt?o.createdAt:" "} </button> 
     {o.paymentIntent.status==="canceled"?(" "):(<button className="btn col-md-4  mb-2  btn-raised btn-danger" onClick={()=>handleCancel(o.paymentIntent.id,o._id)} disabled={d1<new Date(o.products[0].dateofjourney)}>cancel</button>)} 

        </div>


       {showOrderTable(o)}
       <div className="row">
        <div className="col">
          {/* <button className="btn btn-outlined btn-primary"><a>PDF download</a></button> */}
        </div>
       </div>
  
      </div>
    ))
  );
  
}


  return(
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 m-4">
        <UserNav />
      </div>
      <div className="col text-center">
 <button className="btn btn-raised m-4"><h4 className="m-2 " style={{color:'#006600'}}> {orders.length>0?"Order History":"Not Placed Any Order"}</h4></button>  
       {showEachOrder()}     
    </div>
    </div>
  </div>
  );
};
  


export default History;
