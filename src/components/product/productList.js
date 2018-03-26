import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/actions";
import keyGen from "../../idGen";
import { Card, CardMedia, CardTitle, CardText } from "material-ui";

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
            <div className="col-sm-3 pb-4" key={keyGen()}>
              <Card>
                <CardMedia>
                  <img
                    src={`/getImage/${product.image}`}
                    alt={product.altText}
                  />
                </CardMedia>
                <CardTitle title={product.name} />
                <CardText>{product.description}</CardText>
                <CardText>${product.price}</CardText>
              </Card>
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
          <div className="row">{products}</div>
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
