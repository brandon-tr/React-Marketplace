export default (state = false, action) => {
  switch (action.type) {
    case "SEND_REQUEST":
      return true;
    case "GOT_RESPONSE":
      return false;
    default:
      return state;
  }
};
