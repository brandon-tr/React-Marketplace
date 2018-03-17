import React from "react";
import Home from "./home";
import Register from "./authentication/register";
import Login from "./authentication/login";
import CreateProduct from "./product/CreateProduct";
import { Route, Link } from "react-router-dom";
import { AuthRoute, CheckAuthPages } from "../routeAuth";

const Routes = () => {
  return (
    <div>
      <ul className="links">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/product-list"> Product List </Link>
        </li>
        {localStorage.getItem("token") === null ? (
          <span>
            <li>
              <Link to="/register"> Register</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
            </li>
          </span>
        ) : (
          <li>
            <Link to="/product-creation"> Product Creation </Link>
          </li>
        )}
      </ul>
      <Route path="/" exact component={Home} />
      <CheckAuthPages path="/register" component={Register} />
      <CheckAuthPages path="/login" component={Login} />
      <AuthRoute path="/product-creation" component={CreateProduct} />
      <Route path="/product-list" component={CreateProduct} />
      <Route path="/product/:id" component={CreateProduct} />
    </div>
  );
};

export default Routes;
