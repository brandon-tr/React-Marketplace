import { combineReducers } from "redux";
import emptyReducer from "./emptyReducer";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import addProductReducer from "./addProductReducer";
import listProductReducer from "./listProductReducer";
import imageReducer from "./imageReducer";
import loadingReducer from "./loadingReducer";
import userInfo from "./userInfo";
import retrieveUser from "./retrieveUser";
import sockets from "./sockets";
import checkOut from "./checkOut";

const allReducers = combineReducers({
  emptyReducer: emptyReducer,
  addProduct: addProductReducer,
  listProduct: listProductReducer,
  auth: authReducer,
  form: formReducer,
  router: routerReducer,
  image: imageReducer,
  loading: loadingReducer,
  tokenInfo: userInfo,
  userInfo: retrieveUser,
  sockets: sockets,
  checkOut: checkOut
});

export default allReducers;
