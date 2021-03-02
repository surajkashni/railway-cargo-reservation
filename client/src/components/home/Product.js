import React,{useState,useEffect} from 'react';
import {getProduct,productStar,getRelated} from "../../functions/product";
//  import SingleProduct from "../cards/SingleProduct";
import {useSelector} from 'react-redux';
// import ProductCard from '../cards/ProductCard';

const Product=({match})=>{
 const [product,setProduct]=useState({});
 const [star,setStar]=useState(0);
 const [related,setRelated]=useState("");
 const {user} =useSelector((state)=>({...state}));
 const {slug}=match.params;

 useEffect(() => {
    loadProduct(); 
 }, [slug]);


 const loadProduct=()=>{
     getProduct(slug).then(res=>{
         setProduct(res.data)
         getRelated(res.data._id).then((res)=>setRelated(res.data));  
        });
 }

 const onStarClick=(newRating,name)=>{
    setStar(newRating);
    console.log(newRating,name);
    productStar(name,newRating,user.token)
    .then(res=>{
        console.log('rating clicked ',res.data);
        loadProduct();
    }).catch((err)=>console.log(err));
}

//  return ( <div>
//      <div className="row mt-3">
//      <SingleProduct product={product} onStarClick={onStarClick} star={star}/> 
//      </div>
//      <div className="row ">
     
//      <div className="col text-center pt-5 pb-5">
//      <hr/>
//          <h4>Related Product</h4>
//          <hr/>  
//      </div>
         
//      </div>
//       <div className="row pb-5">
//      {related.length?related.map((r)=>(
//          <div key={r._id} className="col-md-4">
//              <ProductCard product={r}/>
//          </div>
//      )):(<div className="col text-center"><h4>No Product Found</h4></div>)}
//   </div>
//   </div>
//  )
     
 
}

export default Product;