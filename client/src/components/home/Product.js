import React,{useState,useEffect} from 'react';
import {getProducts,productStar,getRelated} from "../../functions/product";
//  import SingleProduct from "../cards/SingleProduct";
import {useSelector} from 'react-redux';
// import ProductCard from '../cards/ProductCard';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Product=({})=>{
 const [product,setProduct]=useState({});
 const {user} =useSelector((state)=>({...state}));
 
 const [source,setSource]=useState('');
 const [destination,setDestination]=useState("");

 useEffect(() => {
    loadProduct(); 
 }, []);


 const loadProduct=()=>{
    //  getProducts(source,destination).then(res=>{
    //      setProduct(res.data);
    //      console.log(product);
         
        }
 



 return ( 
     <div className='container-fluid'>

         <div className="row">
             <div className="col">
                <Form>
                <FormGroup>
        <Label for="source">Source</Label>
        <Input type="select" name="Source" >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup> 
                </Form>

             </div>

         </div>

     </div>
 )
     
}


export default Product;