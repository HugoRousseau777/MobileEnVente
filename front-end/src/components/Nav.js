import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  
  return (
    <div>
      <img className="logo" src="https://yt3.googleusercontent.com/ytc/APkrFKZ2MZZcwiRZwDCd719cQbBhD7lt4pHypApsByXZCA=s900-c-k-c0x00ffffff-no-rj"/>
{
      auth ?
      <ul className="nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">addProduct</Link>
        </li>
        
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
            <Link onClick={logout} to="/signup">
            Logout {JSON.parse(auth).name}
            </Link>
        </li>
      </ul>
      :
      <ul className="nav-ul">
         <li>
         <Link to="/signUp">Signup</Link> 
         </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
}
    </div>
  );

};

export default Nav;
