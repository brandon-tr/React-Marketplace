import update from "immutability-helper";
import { LOCATION_CHANGE } from "react-router-redux";

export default (state = null, action) => {
  switch (action.type) {
    case "CHECKOUT":
      return update(state, { $set: action.payload.data.response });
    case "CHECKOUT_ERROR":
      return update(state, { $set: action.payload.response.data });
    case LOCATION_CHANGE: {
      return update(state, { $set: null });
    }
    default:
      return state;
  }
};
