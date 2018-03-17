import React, { Component } from "react";
import Form from "./CreateProductForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addProduct } from "../../redux/actions/actions";
import "./style.css";

class CreateProduct extends Component {
  handleSubmit = e => {
    this.props.addProduct(e, this.file);
  };
  handleChange = file => {
    this.file = file;
  };
  render() {
    return (
      <div>
        <p>Welcome to Product Creation</p>
        <Form onSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {this.props.status ? (
          this.props.status.error ? (
            <span className="error">{this.props.status.error} </span>
          ) : (
            <span className="success">{this.props.status} </span>
          )
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    status: state.product
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addProduct: addProduct
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateProduct);
