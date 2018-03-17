import update from "immutability-helper";

export default (state = null, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return update(state, { $set: action.payload.data.response });
    case "ERROR_PRODUCT":
      return update(state, {
        $set: { error: action.payload.response.data.error }
      });
    default:
      return state;
  }
};
