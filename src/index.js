import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store, history } from "./redux/store";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import { ConnectedRouter as Router } from "react-router-redux/es";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
