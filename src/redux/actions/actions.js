import axios from "axios";

export const returnHi = () => {
  return {
    type: "RETURN_HI",
    payload: "hi"
  };
};

export const newConnection = data => {
  return {
    type: "NEW_CONNECTION",
    payload: data
  };
};

export const getTokenInfo = token => {
  return {
    type: "GET_TOKEN_INFO",
    payload: token
  };
};
export const getUserInfo = token => {
  return dispatch =>
    axios
      .get(`/getUser/${token.id}`)
      .then(res => {
        dispatch({ type: "GOT_USER", payload: res });
      })
      .catch(res => {
        console.log(res);
      });
};

export const addToCart = (token, product) => {
  return dispatch =>
    axios
      .post(`/addCart/${token.id}`, product)
      .then(res => {
        dispatch(getUserInfo(token));
        dispatch({ type: "ADD_CART", payload: res, token: token });
      })
      .catch(res => {
        dispatch({ type: "ADD_CART_ERROR", payload: res });
      });
};

export const addImage = img => {
  return {
    type: "UPLOAD_IMAGE",
    payload: img
  };
};

export const imgError = () => {
  return {
    type: "IMAGE_ERROR",
    payload: {
      response: {
        data: { error: "Image not found, please reupload the image" }
      }
    }
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

export const getProducts = () => {
  return dispatch =>
    axios
      .get("/listProducts")
      .then(res => {
        dispatch({ type: "LIST_PRODUCTS", payload: res });
      })
      .catch(res => {
        dispatch({ type: "ERROR_PRODUCT_LIST", payload: res });
      });
};

export const checkOut = (id, price) => {
  return dispatch =>
    axios
      .post(`/checkOut/${id}`, { price: price })
      .then(res => {
        dispatch({ type: "CHECKOUT", payload: res });
      })
      .catch(res => {
        dispatch({ type: "CHECKOUT_ERROR", payload: res });
      });
};

export const imageRecognition = () => {
  return dispatch =>
    axios
      .get("/getImageText")
      .then(res => {
        dispatch({ type: "IMAGE_ALT_TEXT", payload: res });
      })
      .catch(res => {
        dispatch({ type: "IMAGE_ALT_TEXT_ERROR", payload: res });
      });
};

export function loadingStart() {
  return {
    type: "SEND_REQUEST"
  };
}

const loadingEnd = () => {
  return {
    type: "GOT_RESPONSE"
  };
};

export const addProduct = product => {
  const fd = new FormData();
  fd.append("image", product.image[0], product.image[0].name);
  fd.append("name", product.name);
  fd.append("description", product.description);
  fd.append("price", product.price);
  return dispatch => {
    dispatch(loadingStart());
    axios
      .post("/addProduct", fd)
      .then(res => {
        dispatch(loadingEnd());
        dispatch({ type: "ADD_PRODUCT", payload: res });
      })
      .catch(res => {
        dispatch(loadingEnd());
        dispatch({ type: "ERROR_PRODUCT", payload: res });
      });
  };
};
