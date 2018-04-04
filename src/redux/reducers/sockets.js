import update from "immutability-helper";

export default (state = { onlineUsers: 0 }, action) => {
  switch (action.type) {
    case "NEW_CONNECTION":
      return update(state, { onlineUsers: { $set: action.payload } });
    default:
      return state;
  }
};
