import axios from "axios";

export const returnHi = () => {
  return {
    type: "RETURN_HI",
    payload: "hi"
  };
};

export const register = user => {
  return dispatch =>
    axios
      .post("/register", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.pass
      })
      .then(res => {
        dispatch({ type: "REGISTER", payload: res });
      })
      .catch(res => {
        dispatch({ type: "ERROR", payload: res });
      });
};

export const login = () => {
  return {
    type: "LOGIN",
    payload: "hi"
  };
};
