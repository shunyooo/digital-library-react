import { render } from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import * as React from "react";
import { SnackbarProvider } from "notistack";
import firebase from "./plugins/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "./pages/Home/HomePage";

const rootEl = document.getElementById("root");

const PrivateRoute: React.FC<RouteComponentProps> = ({
  component: Component,
  ...rest
}) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log(user, loading, error);
  console.log(user ? "login success" : "login failed");
  if (loading) {
    return <p>読み込み中...</p>;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: "/home" }} />
        </Route>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </SnackbarProvider>,
  rootEl
);
