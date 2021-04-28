import axios from "axios";


export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
  export const getOrder = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/order`, {
    headers: {
      authtoken,
    },
  });
