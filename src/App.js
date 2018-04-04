import React, { Component } from "react";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  returnHi,
  getTokenInfo,
  getUserInfo,
  newConnection
} from "./redux/actions/actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withRouter } from "react-router-dom";
import Routes from "./components/routes";
import io from "socket.io-client";
export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
class App extends Component {
  componentDidMount() {
    if (!this.props.userInfo && localStorage.getItem("token")) {
      const decoded = parseJwt(localStorage.getItem("token"));
      this.props.getTokenInfo(decoded);
      this.props.getUserInfo(decoded);
    }
    const socket = io("localhost:5000");
    socket.on("connect", () => {});
    socket.on("Online Users", data => {
      this.props.newConnection(data);
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <Routes
          token={this.props.tokenInfo}
          user={this.props.userInfo}
          sockets={this.props.sockets}
        />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    emptyReducer: state.hi,
    tokenInfo: state.tokenInfo,
    userInfo: state.userInfo,
    sockets: state.sockets
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      returnHi: returnHi,
      getTokenInfo: getTokenInfo,
      getUserInfo: getUserInfo,
      newConnection: newConnection
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
