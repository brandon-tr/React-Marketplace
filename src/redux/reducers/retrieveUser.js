import update from "immutability-helper";

export default (state = null, action) => {
  switch (action.type) {
    case "GOT_USER":
      if (action.payload.data) {
        return update(state, { $set: action.payload.data });
      } else {
        return update(state, { $set: "ERROR: Please Relog" });
      }
    case "GOT_USER_ERROR":
      return update(state, { $set: "ERROR: Please Relog" });
    default:
      return state;
  }
};
