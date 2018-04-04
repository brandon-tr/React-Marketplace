import React, { Component } from "react";
import Form from "./loginForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login, getUserInfo, getTokenInfo } from "../../redux/actions/actions";
import "./style.css";
import { parseJwt } from "../../App";

class Login extends Component {
  handleSubmit = e => {
    this.props.login(e);
  };
  render() {
    if (localStorage.getItem("token")) {
      if (!this.props.userInfo && localStorage.getItem("token")) {
        const decoded = parseJwt(localStorage.getItem("token"));
        this.props.getTokenInfo(decoded);
        this.props.getUserInfo(decoded);
      }
    }
    return (
      <div>
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit} />
        {this.props.status ? (
          this.props.status.success ? (
            <span className="success">{this.props.status.success}</span>
          ) : (
            <span className="error"> {this.props.status} </span>
          )
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.auth
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login: login,
      getUserInfo: getUserInfo,
      getTokenInfo: getTokenInfo
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
