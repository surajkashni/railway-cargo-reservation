import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav style={{alignContent:"center"}}  >
    <ul className=" navbar-nav flex-column">
      <button className=" btn-lg btn"><li className="nav-item">
        <Link to="/admin/dashboard"  >
          Dashboard
        </Link>
      </li></button>
      <button className=" btn-lg btn ">
      <li className="nav-item">
        <Link to="/admin/product" >  
          Train
        </Link>
      </li>
      </button>
      <button className=" btn-lg btn">
      <li className="nav-item">
        <Link to="/admin/products" >
        Trains
        </Link>
      </li>
      </button>
     

      

      {/* <li className="nav-item">
        <Link to="/admin/category" className="nav-link"  style={{ textDecoration: 'none' }}>
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link" style={{ textDecoration: 'none' }}>
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link" style={{ textDecoration: 'none' }}>
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link" style={{ textDecoration: 'none' }}>
          Password
        </Link>
      </li> */}
    </ul>
  </nav>
);

export default AdminNav;
