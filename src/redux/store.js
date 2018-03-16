import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/allReducers";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux/es";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const history = createHistory();
const middleware = routerMiddleware(history);
export const store = createStore(reducer, applyMiddleware(thunk, middleware));
