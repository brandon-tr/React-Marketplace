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
            <li key={keyGen()}>
              <img src={`/getImage/${product.image}`} alt={product.altText} />
            </li>,
            <li key={keyGen()} id="price">
              ${product.price}
            </li>
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
          <ul>{products}</ul>
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
