import React,{useState,useEffect} from "react";
import {Card,Skeleton,Tooltip} from 'antd';
import { useHistory } from "react-router-dom";
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import _ from 'lodash';
import image from '../images/images.jfif';
import {useSelector,useDispatch} from 'react-redux';
//  import showAverage from '../../functions/rating';
const {Meta} =Card;
const ProductCard=({product})=>{
    //destt
    const {title,category,source,destination,price,quantity,sold,day1,day2}=product;
    const available= quantity-sold;
    const dispatch=useDispatch();
    const [tooltip,setTooltip]=useState("click to book!");
    const history =useHistory();
    // function nextWeekdayDate(date, day_in_week) {
        
    //         var now = new Date();    
    //         now.setDate(now.getDate() + (day_in_week+(7-now.getDay())) % 7);
    //         console.log(now);
    //         return now;
        
        

 
    //   }
      const date= new Date();
      const ms=date.getTime();
      

      let day;

      switch(day1){
        case "monday":
            day=1;
            break;
        case "sunday":
            day=0;
            break;
        case "tuesday":
            day=2;
            break;
            case "wednesday":
               day=3;
               break;
               case "thursday":
                   day=4;
                   break;
                   case "friday":
                       day=5;
                       break;
                       case "saturday":
                           day=6;
                           break;
                           default:
                               day=0;
                            }

      const dayweek=date.getDay();
      const t=date.getDate();

      var nextweek;
      if(day===dayweek){
        date.setDate(t+7);
      }else{
          var diff=(day-dayweek);
          if(diff>0){
              date.setDate(t+diff);
          }else{
              date.setDate(t+(7+diff));
          }
      }
      
        
      
      const year=date.getFullYear();
      const month=date.getMonth()+1;
      const d=date.getDate();

    const handleBook=()=>{
        let cart=[];
        if(typeof window !="undefined"){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem("cart"));
            }
            cart.push({
                ...product,
                count:1,
                dateofjourney:d+"-"+month+"-"+year,
            });
            let unique=_.uniqWith(cart,_.isEqual);
            localStorage.setItem("cart",JSON.stringify(unique));
            setTooltip("Added!");
            dispatch({
                type:"ADD_TO_CART",
                payload:unique,
            });
            history.push('/cart');
            
        }
    }

    return(
        <>
       

        <Card cover={
            <img src={image}
            style={{height:"190px",objectFit:"cover"}}
            className="p-1"
           />
        }
        // actions={}
        >
            <Meta title={title} 
            />
            <hr/>

           <h7>Price:</h7>     Rs.{price}<br/><hr/>
           <h7>Available:</h7>    {quantity}<br/>
           <h7>Source-Destination:</h7>  {source}-{destination}<br/>
           <h7>Category:</h7>     {category}<br/>
           <h7>Departure On:</h7>      {day1}<br/>
           <h7>Reaching On:</h7>    {day2}
           <hr/>
           <h7>Date of Journey:</h7>{d}/{month}/{year}
           <Tooltip title={product.quantity>0?tooltip:"Out of stock"}> <a onClick={handleBook} disabled={product.quantity<1}> <button className="btn btn-raised btn-primary">{product.quantity?("Book"):("Not Availble")}</button></a></Tooltip>   

        </Card>
        </>
    )
}

export default ProductCard;