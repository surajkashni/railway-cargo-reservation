import React,{useState,useEffect} from 'react';
import axios from 'axios';

//  import SingleProduct from "../cards/SingleProduct";
import {useSelector} from 'react-redux';
// import ProductCard from '../cards/ProductCard';
import { Form, FormGroup, Label, Input, FormText,Button } from 'reactstrap';
import ProductCard from '../components/cards/ProductCard';



const Home = () => {
   
  const [product,setProduct]=useState([]);
  const {user} =useSelector((state)=>({...state}));
 
 const [source,setSource]=useState("delhi");
 const [destination,setDestination]=useState("mumbai");
 
  const s=['delhi','b','c','d','e','f','g','h','i','pathankot'];
  const d=['mumbai','k','l','m','n','o','jammu'];
   const handleSubmit=(e)=>{
     e.preventDefault();
    loadProduct();
   }


 const loadProduct= async()=>{
  
   await axios.post(`${process.env.REACT_APP_API}/trains`,{},{
     headers:{
       source,
       destination,
     }
   }
    ).then((res)=>{
     console.log(res.data);
    setProduct(res.data);
  
  })

    }
 return ( 

      <>
   

         <div className="row m-5 p-1 ">
             
           <div  className="p-2 col-md-3">
           <Form onSubmit={handleSubmit} >
                <FormGroup>
        <Label  for="source">Source</Label>
        <Input type="select" name="Source" value={source} onChange={e=>setSource(e.target.value)}>
          {s.map((i)=>(
         <option>{i}</option>
          ))}
         
          
        </Input>
      </FormGroup> 
      <FormGroup>
        <Label for="destination" >Destination</Label>
        <Input className='p-1' type="select" name=" destination" value={destination} onChange={e=>setDestination(e.target.value)}>
          
        {d.map((i)=>(
         <option>{i}</option>
          ))}
        </Input>
      </FormGroup> 
      <Button className="btn-raised">Find</Button>
                </Form>
        </div>
        <div className="col-md-9 p-2 bg-light">
          <div className="row">
         {product? product.map((p,i) => (
              <div key={i} className="col-md-4">
               <ProductCard product={p}/>
              </div>
          )):<div >"No Train Available"</div>}
          </div>
           

        </div>      

         </div>
         
    </>
 );
     

}

 

export default Home;
