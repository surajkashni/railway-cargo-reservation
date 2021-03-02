import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav   >
    <ul className=" navbar-nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link" style={{ textDecoration: 'none' }}>
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link"  style={{ textDecoration: 'none' }}>
          Train
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link"  style={{ textDecoration: 'none' }}>
        Trains
        </Link>
      </li>

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
