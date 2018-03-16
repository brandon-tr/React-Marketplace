import React, { Component } from "react";
import Form from "./registerForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { register } from "../../redux/actions/actions";
import keyGen from "../../idGen";

class Register extends Component {
  handleSubmit = e => {
    this.props.register(e);
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit} />
        {this.props.status ? (
          !Array.isArray(this.props.status) ? (
            <span>{this.props.status} </span>
          ) : (
            <ul>
              {this.props.status.map(err => {
                return <li key={keyGen()}>{err} </li>;
              })}
            </ul>
          )
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    status: state.auth
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      register: register
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);
