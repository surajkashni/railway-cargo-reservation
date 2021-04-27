import React from 'react';
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";


const Order=({order,handleStatusChange})=>{
    console.log("order",JSON.stringify(order,null,4));
    const showOrderTable=(order)=>{
        return(
          <table className="table table-bordered m-3">
            <thead className="thead-light">
            <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Count</th>
          <th scope="col">Source</th>
          <th scope="col">Destination</th>

         
          

        </tr>
      
            </thead>
            <tbody className="bg-white">
              {order.products.map((p,i)=>(
                <tr ket={i}>
                  
                  <td><b>{p.product.title}</b></td>
            <td>Rs.{p.price}</td>
            <td>{p.count}</td>
            <td>{p.product.source}</td>
            <td>{p.product.destination}</td>
          
      
                </tr>
              ))}
            </tbody>
      
          </table>
        );
      
        
        
      }

    
    return(
        
        
        <div>
                {order.map((order)=>(
            <div key={order._id} className="row p-3 m-1 mb-3 bg-light">
                <div className="btn btn-block bg-light">
                <button className="btn col-md-4   btn-raised mb-2 bg-white">Amount Rs.{order.paymentIntent.amount} </button> 

                      <div className="col">
                      <button className="btn col-md-4   btn-raised mb-2 bg-white">UserName:{order.orderdBy.name} </button> 
                      <button className="btn col-md-4   btn-raised mb-2 bg-white">Email :{order.orderdBy.email} </button> 
                      </div>
                      </div>
                      
                     
                      {/* <div className="row">
                        <div className="col text-center">
                        <h7>Address: </h7>
                      <p>{order.Address}</p>
                        </div>
                        

                      </div> */}

                    
        
                
                   
                      <div className="row m-2">
                        
                      {/* <div className="col"> */}
                        <select 
                        onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                        className='form-control'
                        
                        defaultValue={order.paymentIntent.status}
                        name="status"
                        >
                          <option value="captured">Captured</option>
                          <option value="canceled">Cancelled</option>
                          <option value="Completed">Completed</option>
        
                        </select>
                        {/* </div> */}
                    
                      </div>
                  
                    
                   
                    
                
                {showOrderTable(order)}
            </div>
        ))}
    </div>

    );
        }

   



export default Order;