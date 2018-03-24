import update from "immutability-helper";
import { LOCATION_CHANGE } from "react-router-redux";

export default (state = null, action) => {
  switch (action.type) {
    case "LIST_PRODUCTS":
      return update(state, { $set: action.payload.data.response });
    case LOCATION_CHANGE:
      return "";
    case "ERROR_PRODUCT_LIST":
      return update(state, {
        $set: { error: action.payload.response.data.error }
      });
    default:
      return state;
  }
};
