import React, { Component } from "react";
import Home from "./home";
import Register from "./authentication/register";
import Login from "./authentication/login";
import CreateProduct from "./product/CreateProduct";
import UserPage from "./user/userPage";
import { Route, Link } from "react-router-dom";
import { AuthRoute, CheckAuthPages } from "../routeAuth";
import productList from "./product/productList";
import { AppBar, MenuItem, Drawer } from "material-ui";
import cart from "./user/cart";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });
  style = {
    appBarTitle: {
      paddingLeft: "200px"
    },
    menuItem: {
      color: "white"
    },
    menuTitle: {
      backgroundColor: "#4267b2",
      color: "white"
    }
  };

  render() {
    return (
      <div>
        <div>
          <AppBar title="Marketplace" onLeftIconButtonClick={this.handleToggle}>
            <MenuItem
              className="d-none d-sm-none d-md-flex"
              primaryText="Home"
              style={this.style.menuItem}
              containerElement={<Link to="/" />}
            />
            <MenuItem
              className="d-none d-sm-none d-md-flex"
              primaryText="Product List"
              style={this.style.menuItem}
              containerElement={<Link to="/product-list" />}
            />
            {localStorage.getItem("token") ? (
              <MenuItem
                className="d-none d-sm-none d-md-flex"
                primaryText="Create Product"
                style={this.style.menuItem}
                containerElement={<Link to="/product-creation" />}
              />
            ) : (
              <MenuItem
                className="d-none d-sm-none d-md-flex"
                primaryText="Login"
                style={this.style.menuItem}
                containerElement={<Link to="/login" />}
              />
            )}
            {localStorage.getItem("token") === null ? (
              <MenuItem
                className="d-none d-sm-none d-md-flex"
                primaryText="Register"
                style={this.style.menuItem}
                containerElement={<Link to="/register" />}
              />
            ) : this.props.token ? (
              <MenuItem
                className="d-none d-sm-none d-md-flex"
                primaryText="Account"
                style={this.style.menuItem}
                containerElement={<Link to={`/user/${this.props.token.id}`} />}
              />
            ) : null}
            {localStorage.getItem("token") === null ? null : this.props.token &&
            this.props.user ? (
              <MenuItem
                className="d-none d-sm-none d-md-flex"
                primaryText={`Cart (${this.props.user.cart.length})`}
                style={this.style.menuItem}
                containerElement={<Link to={`/cart/${this.props.token.id}`} />}
              />
            ) : null}
          </AppBar>

          <Drawer
            docked={false}
            width={240}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <div className="pb-3 pt-3 pl-2 w-100 bg-primary text-white">
              <h4>Menu</h4>
            </div>
            <MenuItem
              primaryText="Home"
              containerElement={<Link to="/" />}
              onClick={this.handleClose}
            />
            <hr />
            <MenuItem
              primaryText="Product List"
              containerElement={<Link to="/product-list" />}
              onClick={this.handleClose}
            />
            <hr />
            {localStorage.getItem("token") ? (
              <MenuItem
                primaryText="Create Product"
                containerElement={<Link to="/product-creation" />}
                onClick={this.handleClose}
              />
            ) : (
              <MenuItem
                primaryText="Login"
                containerElement={<Link to="/login" />}
                onClick={this.handleClose}
              />
            )}
            <hr />
            {localStorage.getItem("token") === null ? (
              <MenuItem
                primaryText="Register"
                containerElement={<Link to="/register" />}
                onClick={this.handleClose}
              />
            ) : this.props.token && this.props.user ? (
              <MenuItem
                primaryText={`Cart (${this.props.user.cart.length})`}
                containerElement={<Link to={`/cart/${this.props.token.id}`} />}
                onClick={this.handleClose}
              />
            ) : null}
            <hr />
          </Drawer>
        </div>
        <div className="container">
          Online Users: {this.props.sockets.onlineUsers}
          <Route path="/" exact component={Home} />
          <CheckAuthPages path="/register" component={Register} />
          <CheckAuthPages path="/login" component={Login} />
          <AuthRoute path="/product-creation" component={CreateProduct} />
          <AuthRoute path="/user/:id" component={UserPage} />
          <AuthRoute path="/cart" component={cart} />
          <Route path="/product-list" component={productList} />
          <Route path="/product/:id" component={CreateProduct} />
        </div>
      </div>
    );
  }
}

export default Routes;
