import { combineReducers } from "redux";
import emptyReducer from "./emptyReducer";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const allReducers = combineReducers({
  emptyReducer: emptyReducer,
  product: productReducer,
  auth: authReducer,
  form: formReducer,
  router: routerReducer
});

export default allReducers;
