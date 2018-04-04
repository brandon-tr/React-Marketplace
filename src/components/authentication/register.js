import React, { Component } from "react";
import Form from "./registerForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  register,
  getTokenInfo,
  getUserInfo
} from "../../redux/actions/actions";
import keyGen from "../../idGen";
import "./style.css";
import { parseJwt } from "../../App";

class Register extends Component {
  handleSubmit = e => {
    this.props.register(e);
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
          !Array.isArray(this.props.status) ? (
            <span className="success">{this.props.status} </span>
          ) : (
            <ul>
              {this.props.status.map(err => {
                return (
                  <li key={keyGen()} className="error">
                    {err}
                  </li>
                );
              })}
            </ul>
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
      register: register,
      getTokenInfo: getTokenInfo,
      getUserInfo: getUserInfo
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);
