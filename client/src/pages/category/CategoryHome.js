import React,{useEffect,useState} from 'react';
import {getCategory} from "../../functions/category";
import {Link} from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from '../../components/category/CategoryList';

const CategoryHome=({match})=>{
    const [category,setCategory]=useState({});
    const [products,setProduct]=useState([]);
    const [loading,setLoading]=useState(false);

    const {slug}=match.params;

    useEffect(() => {
      
        setLoading(true);
        getCategory(slug).then((c)=>{
            console.log(JSON.stringify(c.data,null,4));
            setCategory(c.data);
        });
        
    }, []);
}

export default CategoryHome;