import update from "immutability-helper";
import { LOCATION_CHANGE } from "react-router-redux";

export default (state = null, action, token) => {
  switch (action.type) {
    case "ADD_CART":
      return update(state, { $set: action.payload.data.response });
    case "ADD_CART_ERROR":
      return update(state, { $set: action.payload.response.data });
    case LOCATION_CHANGE: {
      return update(state, { $set: null });
    }
    default:
      return state;
  }
};
