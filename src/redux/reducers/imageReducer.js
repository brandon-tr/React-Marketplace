import update from "immutability-helper";
import { LOCATION_CHANGE } from "react-router-redux";

export default (state = null, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGE":
      return update(state, { $set: action.payload });
    case LOCATION_CHANGE:
      return "";
    default:
      return state;
  }
};
