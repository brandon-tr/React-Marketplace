import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUserInfo, checkOut } from "../../redux/actions/actions";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import keyGen from "../../idGen";
import ImageZoom from "react-medium-image-zoom";
import { RaisedButton } from "material-ui";

class Cart extends Component {
  render() {
    let cart;
    let price = 0;
    if (this.props.userInfo) {
      cart = this.props.userInfo.cart.map(item => {
        price += parseInt(item.price);
        return (
          <div key={keyGen()}>
            <List>
              <ListItem
                leftIcon={
                  <ImageZoom
                    image={{
                      src: `/getImage/${item.image}`,
                      alt: item.altText,
                      style: {
                        width: "150px",
                        height: "100px"
                      }
                    }}
                  />
                }
              />
              <ListItem primaryText={item.name} />
              <ListItem primaryText={`$${item.price}`} />
            </List>
            <Divider />
          </div>
        );
      });
    }

    return (
      <div>
        <p>Welcome to Cart</p>
        <hr />
        <Paper>{cart ? <div>{cart}</div> : <h3>Retreiving Cart </h3>}</Paper>
        {this.props.tokenInfo ? (
          <RaisedButton
            label={`Checkout $${price}`}
            onClick={() => {
              this.props.checkOutCart(this.props.tokenInfo.id, price);
            }}
            secondary={true}
          />
        ) : null}
        {this.props.checkOut ? (
          this.props.checkOut.response ? (
            <h1>Successfully Bought Product</h1>
          ) : (
            <h1>{this.props.checkOut.error}</h1>
          )
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    tokenInfo: state.tokenInfo,
    checkOut: state.checkOut
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      checkOutCart: checkOut
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Cart);
