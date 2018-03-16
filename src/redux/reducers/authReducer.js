import update from "immutability-helper";

export default (state = null, action) => {
  switch (action.type) {
    case "REGISTER":
      localStorage.setItem("token", action.payload.data.token);
      return update(state, { $set: action.payload.data.response });
    case "LOGIN":
      localStorage.setItem("token", action.payload.data.token);
      return update(state, { $set: action.payload.data.response });
    case "ERROR":
      return update(state, { $set: action.payload.response.data.response });
    default:
      return state;
  }
};
