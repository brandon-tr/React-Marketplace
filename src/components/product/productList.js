import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/actions";
import keyGen from "../../idGen";
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  Snackbar
} from "material-ui";

class ProductList extends Component {
  componentDidMount() {
    if (!this.props.status) {
      this.props.getProducts();
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      item: ""
    };
  }

  handleClick = item => {
    this.setState({
      open: true,
      item: item
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const style = {
      labelStyle: {
        color: "white"
      },
      snackBar: {
        width: "1000px"
      }
    };
    const products = this.props.products ? (
      this.props.products.length > 0 ? (
        this.props.products.map(product => {
          return [
            <div className="col-sm-3 pb-4" key={keyGen()}>
              <Card className="products">
                <CardMedia>
                  <img
                    src={`/getImage/${product.image}`}
                    alt={product.altText}
                  />
                </CardMedia>
                <CardTitle title={product.name} />
                <CardText id="desc">{product.description}</CardText>
                <hr />
                <div className="row">
                  <CardText className="col-centered price">
                    ${product.price}
                  </CardText>
                  <CardActions className="col-centered">
                    <FlatButton
                      label="Add"
                      backgroundColor="#a4c639"
                      hoverColor="#8AA62F"
                      labelStyle={style.labelStyle}
                      onClick={this.handleClick.bind(this, product.name)}
                    />
                  </CardActions>
                </div>
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
        <Snackbar
          open={this.state.open}
          message={`Added ${this.state.item} to cart`}
          autoHideDuration={1050}
          onRequestClose={this.handleRequestClose}
          contentStyle={style.snackBar}
        />
        <p>Welcome to Products page</p>
        <div>
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
