import React from "react";
import Home from "./home";
import Register from "./authentication/register";
import Login from "./authentication/login";
import CreateProduct from "./product/CreateProduct";
import { Route, Link } from "react-router-dom";
import { AuthRoute, CheckAuthPages } from "../routeAuth";
import productList from "./product/productList";
import { AppBar, Tabs, Tab } from "material-ui";

const Routes = () => {
  const styles = {
    appBar: {
      flexWrap: "wrap"
    },
    tabs: {
      width: "60%"
    }
  };
  return (
    <div>
      <AppBar
        title="React Marketplace"
        showMenuIconButton={false}
        style={styles.appBar}
      >
        <Tabs style={styles.tabs}>
          <Tab label="Home" containerElement={<Link to="/" />} />
          <Tab
            label="Product List"
            containerElement={<Link to="/product-list" />}
          />
          {localStorage.getItem("token") ? (
            <Tab
              label="Create Product"
              containerElement={<Link to="/product-creation" />}
            />
          ) : (
            <Tab label="Login" containerElement={<Link to="/login" />} />
          )}
          {localStorage.getItem("token") === null ? (
            <Tab label="Register" containerElement={<Link to="/register" />} />
          ) : null}
        </Tabs>
      </AppBar>
      <div className="container">
        <Route path="/" exact component={Home} />
        <CheckAuthPages path="/register" component={Register} />
        <CheckAuthPages path="/login" component={Login} />
        <AuthRoute path="/product-creation" component={CreateProduct} />
        <Route path="/product-list" component={productList} />
        <Route path="/product/:id" component={CreateProduct} />
      </div>
    </div>
  );
};

export default Routes;
