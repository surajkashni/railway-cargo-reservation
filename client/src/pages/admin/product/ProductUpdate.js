// import React, { useState, useEffect } from "react";
// import AdminNav from "../../../components/nav/AdminNav";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { getProduct,updateProduct } from "../../../functions/product";
// import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
// //  import { getCategories, getCategorySubs } from "../../../";
// import {LoadingOutlined} from "@ant-design/icons";


// const initialState = {
//   title: "",
//   description: "",
//   price: "",
//   categories: [],
//   category: "",
//   subs: [],
//   shipping: "",
//   quantity: "",
//   images: [],
//   colors: ["Black", "Brown", "Silver", "White", "Blue"],
//   brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
//   color: "",
//   brand: "",
// }; 
// const ProductUpdate = ({match,history}) => {
//   const [values, setValues] = useState(initialState);
//   const [subOptions, setSubOptions] = useState([]);
//   const [arrayOfSubIds,setArrayOfSubIds]=useState([]);
//   const [selectedCategory,setSelectedCategory]=useState('');
//   const [categories, setcategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // redux
//   const { user } = useSelector((state) => ({ ...state }));
//   const {slug} =match.params;
 
//   useEffect(() => {
//     loadProduct();
//     loadCategories();
//   }, [])
  
// const loadProduct=()=>{
//   getProduct(slug).then(
//     (res)=>{
// setValues({...values,...res.data});
// getCategorySubs(res.data.category._id).then((res)=>{
//   setSubOptions(res.data);
// });
// let arr=[];
// res.data.subs.map((s)=>{
//   arr.push(s._id);
// });
// setArrayOfSubIds((prev)=>arr);
//     }
    
//   )
// }
// const loadCategories=()=>{
//   getCategories().then((res)=>setcategories(res.data));
// }

// const handleSubmit=(e)=>{
//   e.preventDefault();
//   setLoading(true);
//   values.subs=arrayOfSubIds;
//   values.category=selectedCategory?selectedCategory:values.category;

//   updateProduct(slug,values,user.token)
//   .then(res=>{
//    setLoading(false);
//   //  toast.success(`"${res.data.title}" is updated`);
//    history.push('/admin/products');
//   })
//   .catch(err=>{
//     setLoading(false);
//     console.log(err);
//     // toast.error(err.response.data.err);

//   })
// }

// const handleChange = (e) => {
//   setValues({ ...values, [e.target.name]: e.target.value });
//   // console.log(e.target.name, " ----- ", e.target.value);
// };
// const handleCatagoryChange = (e) => {
//   e.preventDefault();
//   console.log("CLICKED CATEGORY", e.target.value);
//   setValues({ ...values, subs: [] });
//   setSelectedCategory(e.target.value);

//   getCategorySubs(e.target.value).then((res) => {
//     console.log("SUB OPTIONS ON CATGORY CLICK", res);
//     setSubOptions(res.data);
//   });

//   //if user clicks back to original category
//   //show subcategories in default

//   if(values.category._id===e.target.value){
//     loadProduct();
//   }
//   setArrayOfSubIds([]);
// };


//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-2">
//           <AdminNav />
//         </div>

//         <div className="col-md-10 ">
//         {loading?(<LoadingOutlined className="text-danger h1 "/>):( <h4 >Product Update</h4>)}

// {JSON.stringify(values)}

// <div className="p-3">
//             <FileUpload
//               values={values}
//               setValues={setValues}
//               setLoading={setLoading}
//             />
//           </div>
// <ProductUpdateForm
//  setValues={values} 
//  values={values} 
//  handleSubmit={handleSubmit} 
//  handleChange={handleChange}
//  handleCatagoryChange={handleCatagoryChange}
//  categories={categories}
//  subOptions={subOptions}
//  arrayOfSubIds={arrayOfSubIds}
//  setArrayOfSubIds={setArrayOfSubIds}
//  selectedCategory={selectedCategory}
//  />
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductUpdate;
