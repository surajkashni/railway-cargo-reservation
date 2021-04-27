import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import {emptyUserCart} from '../../functions/user';


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
const __DEV__ = document.domain === 'localhost'
const Checkout = ({ history }) => {
     
    // const [total, setTotal] = useState(0);
    //  const [address, setAddress] = useState("");
    //  const [pin, setPin] = useState("");
    //  const [mobile,setMobile]=useState('');
      
  
    // const [addressSaved, setAddressSaved] = useState(false);
    // const [coupon, setCoupon] = useState("");
    // // discount price
    // const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    // const [discountError, setDiscountError] = useState("");
  
    const dispatch = useDispatch();
    const { user,COD } = useSelector((state) => ({ ...state }));
    var total=0;
    var data={};
    // useEffect(async() => {
      
    // }, []);
    // const handleChange = (e) => {
    //   setValues({ ...values, [e.target.name]: e.target.value });
    //   // console.log(e.target.name, " ----- ", e.target.value);
    // };
  
    const emptyCart = async() => {
      // remove from local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      // remove from redux
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // remove from backend
      await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
          authtoken:user.token,
        },
      }).then((res) => {
        
        toast.success("Cart is empty. Continue shopping.");
      });
    };

    async function displayRazorpay() {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
      await axios.get(`${process.env.REACT_APP_API}/user/cart`,{
        headers:{
          authtoken:user.token,
        }
      }).then((res)=>{
        total=res.data.cartTotal;
        console.log(res.data.cartTotal);
        console.log("cart",total)
      });

     
      await axios.post(`${process.env.REACT_APP_API}/user/order`,{COD,total},{
          headers:{
            authtoken:user.token,
          }
        }).then((res) => {
         data=res.data;
         console.log("razor",res.data);
         console.log("data",data);
      if (typeof window !== "undefined") localStorage.removeItem("cart");
      // empty redux cart
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // empty redux coupon
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
      // empty redux COD
      
      // mepty cart from backend
      emptyUserCart(user.token);
      // redirect
      setTimeout(() => {
        history.push("/user/history");
      }, 1000);
   
  });
  
      
      
  
      const options = {
        key: __DEV__ ? 'rzp_test_Ni2qeZhQapTH7o' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Payment For Your Booking',
        description: 'Thank You For Having Our Services',
        handler: function (response) {
          // alert(response.razorpay_payment_id)
          // alert(response.razorpay_order_id)
          // alert(response.razorpay_signature)
        },
        prefill: {
          
          email: '',
          phone_number: ''
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }

   
    const createOrder =async () => {

      await axios.get(`${process.env.REACT_APP_API}/user/cart`,{
        headers:{
          authtoken:user.token,
        }
      }).then((res)=>{
        total=res.data.cartTotal;
        console.log(res.data.cartTotal);
        console.log("cart",total)
      });

     
      await axios.post(`${process.env.REACT_APP_API}/user/order`,{COD,total},{
          headers:{
            authtoken:user.token,
          }
        }).then((res) => {
      setTimeout(()=>{},1000);
      console.log("USER  ORDER CREATED RES ", );
      // //empty cart form redux, local Storage, reset coupon, reset COD, redirect
      
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
     
    });
  };
  
   
  
    
  
    
   
  
    const createCashOrder =async () => {
        await axios.post(`${process.env.REACT_APP_API}/user/cash-order`,{COD},{
            headers:{
              authtoken:user.token,
            }
          }).then((res) => {
        setTimeout(()=>{},1000);
        console.log("USER CASH ORDER CREATED RES ", );
        // //empty cart form redux, local Storage, reset coupon, reset COD, redirect
        
          // empty local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty redux cart
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // empty redux coupon
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty redux COD
          dispatch({
            type: "COD",
            payload: false,
          });
          // mepty cart from backend
          emptyUserCart(user.token);
          // redirect
          setTimeout(() => {
            history.push("/user/history");
          }, 1000);
       
      });
    };
  
    return (
      
        
         <div className="container-fluid" >
           <div className="row    ">
            <div className="col">
             
              {COD==="true"?(
                <button
                className="btn btn-primary btn-lg btn-raised"
                
                onClick={createCashOrder}
              >
                Place Order
              </button>
              ):(
                <button
                className="btn btn-primary btn-lg btn-raised"
                
                onClick={displayRazorpay}
              >
                Place Order
              </button>
              )}  
           </div>
           </div>
            <div className="row " >
            <div className="col">
              <button
                
                onClick={emptyCart}
                className="btn btn-raised btn-lg btn-raised"
              >
                Empty Cart
              </button>
            </div>
          
        </div>
         </div>
          
      
    );
  };
  
  export default Checkout;
  