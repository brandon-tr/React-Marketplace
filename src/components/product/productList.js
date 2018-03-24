import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/actions";
import keyGen from "../../idGen";

class ProductList extends Component {
  componentDidMount() {
    if (!this.props.status) {
      this.props.getProducts();
    }
  }
  render() {
    const products = this.props.products ? (
      this.props.products.length > 0 ? (
        this.props.products.map(product => {
          return [
            <div class="col-3">
              <span key={keyGen()} className="crop">
                <img
                  src={`/getImage/${product.image}`}
                  alt={product.altText}
                  id="productImage"
                  class="img-fluid"
                />
              </span>
              <span key={keyGen()} id="price">
                ${product.price}
              </span>
            </div>
          ];
        })
      ) : (
        <span>No products </span>
      )
    ) : (
      <span>No products </span>
    );
    return (
      <div>
        <p>Welcome to Products page</p>
        <div className="products">
          <div class="row">{products}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.listProduct
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProducts: getProducts
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductList);
