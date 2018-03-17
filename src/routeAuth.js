import React from "react";
import { Route, Redirect } from "react-router-dom";

const checkAuth = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};

export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export const CheckAuthPages = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
