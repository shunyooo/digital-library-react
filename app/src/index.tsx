import { render } from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import LoginSignupPage from "./pages/Auth/LoginSignupPage";
import * as React from "react";
import { SnackbarProvider } from "notistack";
import firebase from "./plugins/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "./pages/Home/HomePage";
import "./App.css";
import "./plugins/Viewport";
import { LinearProgress } from "@material-ui/core";
import LoadingPage from "./pages/Common/LoadingPage";
import SignupThanksPage from "./pages/Auth/SignupThanksPage";
import DataController from "./plugins/DataController";
import { UserRole } from "./plugins/Schemas";
import DBUserStatus from "./plugins/DBUserStatus";
import { useSnackbar } from "notistack";

const rootEl = document.getElementById("root");

const RedirectRoute: React.FC<RouteComponentProps & { pathname: string }> = ({
  pathname,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props): typeof RouteComponentProps => (
        <Redirect
          to={{
            pathname: pathname,
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};

const RoleRoute: React.FC<RouteComponentProps & { validRole: UserRole }> = ({
  component: Component,
  validRole: validRole,
  ...rest
}) => {
  const [user, loading] = DBUserStatus();
  const { enqueueSnackbar } = useSnackbar();
  if (loading) {
    return <LoadingPage description={"ユーザ情報を取得中..."} />;
  }
  console.log(`RoleRoute(${validRole})`, user);
  if (user && user.roles.includes(validRole)) {
    return (
      <Route
        {...rest}
        render={(props): typeof RouteComponentProps => <Component {...props} />}
      />
    );
  } else {
    enqueueSnackbar(
      `${rest.path} は ${user && user.email} には許可されていないURLです.`,
      {
        variant: "error",
      }
    );
    return <RedirectRoute {...rest} pathname="/home" />;
  }
};

const PrivateRoute: React.FC<RouteComponentProps> = ({
  component: Component,
  ...rest
}) => {
  const [user, loading] = useAuthState(firebase.auth());
  console.log(user ? "login success" : "login failed");
  if (loading) {
    return <LoadingPage description={"ユーザ情報を取得中..."} />;
  }
  if (user) {
    return (
      <Route
        {...rest}
        render={(props): typeof RouteComponentProps => <Component {...props} />}
      />
    );
  } else {
    return <RedirectRoute {...rest} pathname="/login" />;
  }
};

render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: "/home" }} />
        </Route>
        <Route exact path="/login" component={LoginSignupPage} />
        <Route
          exact
          path="/only-signup"
          render={(props): React.ReactNode => (
            <Redirect
              to={{
                pathname: "/login",
                search: "?next=signup-thanks",
                state: { from: props.location },
              }}
            />
          )}
        />
        <Route exact path="/signup-thanks" component={SignupThanksPage} />
        <PrivateRoute exact path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </SnackbarProvider>,
  rootEl
);
