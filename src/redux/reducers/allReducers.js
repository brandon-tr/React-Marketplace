import { combineReducers } from "redux";
import emptyReducer from "./emptyReducer";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import addProductReducer from "./addProductReducer";
import listProductReducer from "./listProductReducer";
import imageReducer from "./imageReducer";
import loadingReducer from "./loadingReducer";

const allReducers = combineReducers({
  emptyReducer: emptyReducer,
  addProduct: addProductReducer,
  listProduct: listProductReducer,
  auth: authReducer,
  form: formReducer,
  router: routerReducer,
  image: imageReducer,
  loading: loadingReducer
});

export default allReducers;
