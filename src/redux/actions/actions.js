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

export const login = user => {
  return dispatch =>
    axios
      .post("/login", {
        email: user.email,
        password: user.pass
      })
      .then(res => {
        dispatch({ type: "LOGIN", payload: res });
      })
      .catch(res => {
        dispatch({ type: "ERROR", payload: res });
      });
};

export const addProduct = (product, file) => {
  const fd = new FormData();
  fd.append("image", file.target.files[0], file.target.files[0].name);
  fd.append("name", product.name);
  fd.append("description", product.description);
  fd.append("price", product.price);
  return dispatch =>
    axios
      .post("/addProduct", fd)
      .then(res => {
        dispatch({ type: "ADD_PRODUCT", payload: res });
      })
      .catch(res => {
        dispatch({ type: "ERROR_PRODUCT", payload: res });
      });
};
