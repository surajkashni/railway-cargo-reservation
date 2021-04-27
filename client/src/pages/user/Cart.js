import React from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardCheckout from "../../components/cards/ProductCardCheckout";

const Cart = ({ history }) => {
  const { cart, user ,COD} = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb =async () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type:"COD",
      payload:false,
    })
    await axios.post(
      `${process.env.REACT_APP_API}/user/cart`,
      { cart },
      {
        headers: {
          authtoken:user.token,
        },
      }
    ).then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/user/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };
  const saveOrdercashToDb = async() => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type:"COD",
      payload:true,
    })
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
          headers: {
            authtoken:user.token,
          },
        }
      )
      .then((res) => {
        console.log("CART POST RES", res);
        
        if (res.data.ok) history.push("/user/checkout");
      })
      .catch((err) => console.log("cart save err", err));

     
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Source</th>
          <th scope="col">Destination</th>
          <th scope="col">Count</th>
          <th scope="col">Departure</th>
          <th scope="col">Reaching</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No trains in cart. 
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = Rs.{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>Rs.{getTotal()}</b>
          <hr />
          {user ? (<>
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              Pay Online
            </button>
            <br/>
            <button
              onClick={saveOrdercashToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              Pay on Station
            </button>
            </>
             
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
