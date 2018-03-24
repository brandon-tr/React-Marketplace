import React, { Component } from "react";
import Form from "./CreateProductForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addProduct, addImage, imgError } from "../../redux/actions/actions";
import "./style.css";

class CreateProduct extends Component {
  handleSubmit = e => {
    if (e.image[0]) {
      this.props.addProduct(e);
    } else {
      this.props.imgError();
    }
  };
  handleChange = file => {
    if (file) {
      let getImage = file.target.files[0];
      if (getImage) {
        let img;
        let reader = new FileReader();
        reader.onloadend = () => {
          img = reader.result;
          this.props.addImage(img);
        };
        reader.readAsDataURL(getImage);
      }
    }
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
        <div className="products">
          {this.props.image ? <img src={this.props.image} /> : null}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    status: state.addProduct,
    image: state.image
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addProduct: addProduct,
      addImage: addImage,
      imgError: imgError
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateProduct);
