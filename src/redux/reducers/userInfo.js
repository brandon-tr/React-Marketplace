import update from "immutability-helper";

export default (state = null, action) => {
  switch (action.type) {
    case "GET_TOKEN_INFO":
      return update(state, { $set: action.payload });
    default:
      return state;
  }
};
