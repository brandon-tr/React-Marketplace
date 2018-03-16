import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { returnHi } from "./redux/actions/actions";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "./components/home";
import CreateProduct from "./components/CreateProduct";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <ul className="links">
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/product-list"> Product List </Link>
            </li>
            <li>
              <Link to="/product-creation"> Product Creation </Link>
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
            ) : null}
          </ul>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/product-list" component={CreateProduct} />
          <Route path="/product/:id" component={CreateProduct} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emptyReducer: state.hi
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      returnHi: returnHi
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
