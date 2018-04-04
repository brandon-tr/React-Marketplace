import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUserInfo } from "../../redux/actions/actions";
import TextField from "material-ui/TextField";

class UserPage extends Component {
  render() {
    return (
      <div>
        <p>Welcome to User Page</p>
        <hr />
        {this.props.userInfo ? (
          <div>
            <TextField
              disabled={true}
              defaultValue={this.props.userInfo.name}
              floatingLabelText="Name"
              fullWidth={true}
            />
            <br />
            <TextField
              disabled={true}
              id="text-field-disabled"
              defaultValue={this.props.userInfo.email}
              floatingLabelText="Email"
              fullWidth={true}
            />
            <br />
            <TextField
              disabled={true}
              defaultValue={`$${this.props.userInfo.money}`}
              floatingLabelText="Money"
              fullWidth={true}
            />
          </div>
        ) : (
          <h3>Retreiving User Info </h3>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tokenInfo: state.tokenInfo,
    userInfo: state.userInfo
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserPage);
