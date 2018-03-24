export default (state = "default_value", action) => {
  switch (action.type) {
    case "RETURN_HI":
      return action.payload;
    default:
      return state;
  }
};
