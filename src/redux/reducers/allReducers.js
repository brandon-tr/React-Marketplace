import { combineReducers } from "redux";
import emptyReducer from "./emptyReducer";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";

const allReducers = combineReducers({
  emptyReducer: emptyReducer,
  auth: authReducer,
  form: formReducer,
  router: routerReducer
});

export default allReducers;
