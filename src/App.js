import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { returnHi } from "./redux/actions/actions";
import { withRouter } from "react-router-dom";
import Routes from "./components/routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Routes />
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
