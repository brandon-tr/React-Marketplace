import React, { Component } from "react";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { returnHi } from "./redux/actions/actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withRouter } from "react-router-dom";
import Routes from "./components/routes";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
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
