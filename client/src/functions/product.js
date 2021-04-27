import axios from "axios";


export const getProductsAdmin= async()=>{
  await axios.get(`${process.env.REACT_APP_API}/products`)
  .then(res=>console.log(res));

}


export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });



export const getTrainBySD= async(source,destination)=>{
await axios.get(`${process.env.REACT_APP_API}/trains`,{source,destination})
}

  export const updateProduct=async(slug,product,authtoken)=>{
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
      headers:{
        authtoken,
      },
    })
  }

  export const getProductsByArrivals = async (sort,order,page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {sort,order,page},);


export const getTotalProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

  export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
